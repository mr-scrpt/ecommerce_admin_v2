import { injectable } from "inversify";
import { Order, OrderGetByOwnerSelector } from "../_domain/order.types";
import { OrderRepository } from "../_repository/order.repo";

@injectable()
export class OrderListGetByOwnerService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(selector: OrderGetByOwnerSelector): Promise<Array<Order>> {
    return await this.orderRepo.getOrderListByOwner(selector);
  }
}
