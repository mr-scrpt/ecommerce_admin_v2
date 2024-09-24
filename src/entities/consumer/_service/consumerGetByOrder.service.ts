import { ConsumerGetByOrderSelector } from "@/entities/consumer";
import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";

@injectable()
export class ConsumerGetByOrderService {
  constructor(
    private readonly consumerRepo: IConsumerRepository,
    private readonly orderRepo: IOrderRepository,
  ) {}

  async execute(selector: ConsumerGetByOrderSelector): Promise<Consumer> {
    const { orderId } = selector;

    const { userId } = await this.orderRepo.get({ id: orderId });

    const result = await this.consumerRepo.get({
      id: userId,
    });

    return result;
  }
}
