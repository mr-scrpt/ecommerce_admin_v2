import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createOrderAbility } from "../_domain/order.ability";
import { OrderId, OrderRelationEntity } from "../_domain/types";
import { OrderRepository, orderRepository } from "../_repository/order.repo";

type GetOrderWithRelationByUserId = {
  userId: OrderId;
  session: SessionEntity;
};

class GetOrderWithRelationByUserIdUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async exec(data: GetOrderWithRelationByUserId): Promise<OrderRelationEntity> {
    const { userId, session } = data;
    const { canGetOrder } = createOrderAbility(session);

    if (!canGetOrder()) {
      throw new AuthorizatoinError();
    }

    return await this.orderRepo.getOrderWithRelationByUserId(userId);
  }
}

export const getOrderWithRelationByUserIdUseCase =
  new GetOrderWithRelationByUserIdUseCase(orderRepository);
