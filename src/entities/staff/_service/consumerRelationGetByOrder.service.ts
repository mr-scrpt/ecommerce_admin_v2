import { ConsumerGetByOrderSelector } from "@/entities/consumer";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";
import { ConsumerRelation } from "../_domain/consumer.type";

@injectable()
export class ConsumerRelationGetByOrderService {
  constructor(
    // private readonly consumerGetByOrderTx: IConsumerRelationGetByOrderTx,
    private readonly consumerRepo: IConsumerRepository,
    private readonly orderRepo: IOrderRepository,
  ) {}

  async execute(
    selector: ConsumerGetByOrderSelector,
  ): Promise<ConsumerRelation> {
    const { orderId } = selector;

    const { userId } = await this.orderRepo.get({ id: orderId });
    const result = await this.consumerRepo.getWithRelation({ id: userId });

    return result;
  }
}
