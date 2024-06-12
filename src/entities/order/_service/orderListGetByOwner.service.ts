import { injectable } from "inversify";
import { Order, OrderGetByOwnerSelector } from "../_domain/order.types";
import { IOrderRepository } from "../_domain/repository.type";

@injectable()
export class OrderListGetByOwnerService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(selector: OrderGetByOwnerSelector): Promise<Array<Order>> {
    return await this.orderRepo.getListByOwner(selector);
  }
}
