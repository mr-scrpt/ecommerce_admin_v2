import { injectable } from "inversify";
import { Order } from "../_domain/order.types";
import { IOrderRepository } from "../_domain/repository.type";

@injectable()
export class OrderListGetService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(): Promise<Array<Order>> {
    return await this.orderRepo.getList();
  }
}
