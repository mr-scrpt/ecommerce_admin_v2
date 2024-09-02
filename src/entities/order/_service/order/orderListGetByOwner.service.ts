import { injectable } from "inversify";
import { OrderGetByConsumerSelector } from "../../_domain/order/order.types";
import { Order } from "@/kernel/domain/order/order.type";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";

@injectable()
export class OrderListGetByOwnerService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(selector: OrderGetByConsumerSelector): Promise<Array<Order>> {
    return await this.orderRepo.getListByConsumer(selector);
  }
}
