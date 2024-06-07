import { injectable } from "inversify";
import { Order } from "../_domain/order.types";
import { OrderRepository } from "../_repository/order.repo";

@injectable()
export class OrderListGetService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(): Promise<Array<Order>> {
    return await this.orderRepo.getOrderList();
  }
}
