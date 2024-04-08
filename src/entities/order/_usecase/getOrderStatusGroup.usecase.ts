import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createOrderAbility } from "../_domain/order.ability";
import {
  OrderId,
  OrderRelationEntity,
  OrderStatusGroup,
} from "../_domain/order.types";
import { OrderRepository } from "../_repository/order.repo";
import { injectable } from "inversify";

type GetOrderStatusGroup = {
  orderId: OrderId;
  session: SessionEntity;
};

@injectable()
export class GetOrderStatusGroupUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async exec(data: GetOrderStatusGroup): Promise<OrderStatusGroup> {
    const { orderId, session } = data;
    const { canGetOrder } = createOrderAbility(session);

    if (!canGetOrder()) {
      throw new AuthorizatoinError();
    }

    const order = await this.orderRepo.getOrderWithRelation(orderId);

    return this.filterOrderStatusGroup(order);
  }

  private filterOrderStatusGroup(order: OrderRelationEntity): OrderStatusGroup {
    return {
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
    };
  }
}
