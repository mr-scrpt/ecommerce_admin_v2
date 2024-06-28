import { Order } from "@/kernel/domain/order/order.type";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";

@injectable()
export class OrderListGetService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(): Promise<Array<Order>> {
    return await this.orderRepo.getList();
  }
}
