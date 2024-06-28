import { injectable } from "inversify";
import { OrderGetSelector } from "../_domain/order.types";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { Order } from "@/kernel/domain/order/order.type";

@injectable()
export class OrderGetService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(selector: OrderGetSelector): Promise<Order> {
    return await this.orderRepo.get(selector);
  }
}
