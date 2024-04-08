import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createOrderAbility } from "../_domain/order.ability";
import { OrderId } from "../_domain/order.types";
import { OrderRepository } from "../_repository/order.repo";
import { injectable } from "inversify";

type GetOrderOwnerRelation = {
  orderId: OrderId;
  session: SessionEntity;
};

@injectable()
export class GetOrderOwnerUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async exec(data: GetOrderOwnerRelation): Promise<{ ownerId: string }> {
    const { orderId, session } = data;
    const { canGetOrder } = createOrderAbility(session);

    if (!canGetOrder()) {
      throw new AuthorizatoinError();
    }

    const ownerId = await this.orderRepo.getOrderOwner(orderId);
    return { ownerId };
  }
}
