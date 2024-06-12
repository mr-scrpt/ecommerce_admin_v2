import { injectable } from "inversify";
import { Order, OrderGetSelector, OrderRelation } from "../_domain/order.types";
import { IOrderRepository } from "../_domain/repository.type";

@injectable()
export class OrderRelationGetService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(selector: OrderGetSelector): Promise<OrderRelation> {
    return await this.orderRepo.getWithRelation(selector);
  }
}
