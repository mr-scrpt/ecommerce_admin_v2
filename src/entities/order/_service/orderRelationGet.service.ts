import { injectable } from "inversify";
import { Order, OrderGetSelector } from "../_domain/order.types";
import { OrderRepository } from "../_repository/order.repo";

@injectable()
export class OrderRelationGetService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(selector: OrderGetSelector): Promise<Order> {
    return await this.orderRepo.getOrderWithRelation(selector);
  }
}
