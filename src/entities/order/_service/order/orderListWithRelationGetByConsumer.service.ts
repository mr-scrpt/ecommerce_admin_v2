import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";
import {
  OrderGetByConsumerSelector,
  OrderRelation,
} from "../../_domain/order/order.types";

@injectable()
export class OrderListWithRelationGetByConsumerService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(
    selector: OrderGetByConsumerSelector,
  ): Promise<Array<OrderRelation>> {
    return await this.orderRepo.getListByConsumer(selector);
  }
}
