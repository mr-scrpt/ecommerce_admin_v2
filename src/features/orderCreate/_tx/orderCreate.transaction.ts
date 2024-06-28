import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderEmptyCreateTxDTO } from "../_domain/types";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { OrderEntity } from "@/kernel/domain/order/order.type";
import { IDeliveryRepository } from "@/kernel/domain/delivery/repository.type";

@injectable()
export class OrderCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: IOrderRepository,
    private readonly deliveryRepo: IDeliveryRepository,
  ) {
    super(db);
  }

  async createEmpty(dto: OrderEmptyCreateTxDTO): Promise<OrderEntity> {
    const { orderData, deliveryData } = dto;
    const action = async (tx: Tx) => {
      const { id } = await this.orderRepo.createEmpty({ data: orderData }, tx);

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
