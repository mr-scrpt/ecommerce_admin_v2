import { injectable } from "inversify";
import { Order, OrderGetSelector } from "../_domain/order.types";
import { IOrderRepository } from "../_domain/repository.type";

@injectable()
export class OrderGetService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(selector: OrderGetSelector): Promise<Order> {
    return await this.orderRepo.get(selector);
  }
}
