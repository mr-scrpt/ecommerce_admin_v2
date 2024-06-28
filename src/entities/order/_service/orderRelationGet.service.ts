import { injectable } from "inversify";
import { IOrderRepository } from "../../../kernel/domain/order/repository.type";
import { OrderGetSelector, OrderRelation } from "../_domain/order.types";

@injectable()
export class OrderRelationGetService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(selector: OrderGetSelector): Promise<OrderRelation> {
    return await this.orderRepo.getWithRelation(selector);
  }
}
