import { IOrderRowRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";
import {
  OrderRowGetByOrderSelector,
  OrderRowRelation,
  OrderRowRelationEntity,
} from "../../_domain/orderRow/orderRow.types";

@injectable()
export class OrderRowListWithRelationGetByOrderService {
  constructor(private readonly orderRowRepo: IOrderRowRepository) {}

  async execute(
    selector: OrderRowGetByOrderSelector,
  ): Promise<Array<OrderRowRelation>> {
    const res =
      await this.orderRowRepo.getListWithRelationByOrder<
        Array<OrderRowRelationEntity>
      >(selector);
    return res;
  }
}
