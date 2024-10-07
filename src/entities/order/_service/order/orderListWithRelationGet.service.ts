import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";
import { OrderRelation } from "../../_domain/order/order.types";

@injectable()
export class OrderListWithRelationGetService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(): Promise<Array<OrderRelation>> {
    return await this.orderRepo.getListWithRelation();
  }
}
