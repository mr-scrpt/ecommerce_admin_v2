import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";
import {
  OrderGetSelector,
  OrderRelation,
} from "../../_domain/order/order.types";

@injectable()
export class OrderListGetByOrderService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(selector: OrderGetSelector): Promise<Array<OrderRelation>> {
    const order = await this.orderRepo.get(selector);
    const result = await this.orderRepo.getListByConsumer<OrderRelation>({
      consumerId: order.userId,
    });

    return result;
  }
}
