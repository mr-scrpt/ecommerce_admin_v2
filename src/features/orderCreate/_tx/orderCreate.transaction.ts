import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderEmptyCreateTxDTO } from "../_domain/types";
import {
  IOrderRepository,
  IOrderStatusRepository,
} from "@/kernel/domain/order/repository.type";
import { OrderEntity } from "@/kernel/domain/order/order.type";
import { IDeliveryRepository } from "@/kernel/domain/delivery/repository.type";
import { IOrderCreateTx } from "../_domain/transaction.type";
import { IReceiverRepository } from "@/kernel/domain/receiver/repository.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { ConsumerRelationEntity } from "@/entities/consumer/_domain/consumer.type";

@injectable()
export class OrderCreateTx extends Transaction implements IOrderCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: IOrderRepository,
    private readonly orderStatusRepo: IOrderStatusRepository,
    private readonly deliveryRepo: IDeliveryRepository,
    private readonly consumerRepo: IConsumerRepository,
    private readonly receiverRepo: IReceiverRepository,
  ) {
    super(db);
  }

  async createEmpty(dto: OrderEmptyCreateTxDTO): Promise<OrderEntity> {
    const { orderData, deliveryData, userData } = dto;
    const action = async (tx: Tx) => {
      const { userId } = userData;

      const user =
        await this.consumerRepo.getWithRelation<ConsumerRelationEntity>(
          { id: userId },
          tx,
        );

      let [receiver] = user.receiverList;

      if (!receiver) {
        receiver = await this.receiverRepo.create(
          {
            data: {
              name: user.name ?? "",
              lastName: user.lastName ?? "",
              phone: user.phone ?? "",
              userId: user.id,
            },
          },
          tx,
        );
      }

      const { id } = await this.orderRepo.createEmpty(
        { data: { ...orderData, receiverId: receiver.id, userId } },
        tx,
      );

      const delivery = await this.deliveryRepo.create(
        {
          data: {
            ...deliveryData,
            orderId: id,
          },
        },
        tx,
      );

      this.deliveryRepo.bindToOrder(
        { selector: { id: delivery.id }, target: { orderId: id } },
        tx,
      );

      return await this.orderRepo.get({ id }, tx);
    };

    return await this.start(action);
  }
}
