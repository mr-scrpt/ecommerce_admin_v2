import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createOrderAbility } from "../_domain/order.ability";
import { OrderId, OrderRelationEntity } from "../_domain/order.types";
import { OrderRepository, orderRepository } from "../_repository/order.repo";

type GetOrderWithRelation = {
  orderId: OrderId;
  session: SessionEntity;
};

class GetOrderWithRelationUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async exec(data: GetOrderWithRelation): Promise<OrderRelationEntity> {
    const { orderId, session } = data;
    const { canGetOrder } = createOrderAbility(session);

    if (!canGetOrder()) {
      throw new AuthorizatoinError();
    }

    return await this.orderRepo.getOrderWithRelation(orderId);
  }
}

export const getOrderWithRelationUseCase = new GetOrderWithRelationUseCase(
  orderRepository,
);
