import { injectable } from "inversify";
import { Order, OrderGetSelector } from "../_domain/order.types";
import { OrderRepository } from "../_repository/order.repo";

@injectable()
export class OrderGetService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(payload: OrderGetSelector): Promise<Order> {
    return await this.orderRepo.getOrder(payload);
  }
}
