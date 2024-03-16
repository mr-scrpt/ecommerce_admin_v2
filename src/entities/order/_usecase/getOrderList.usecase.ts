import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createOrderAbility } from "../_domain/order.ability";
import { Order } from "../_domain/types";
import { OrderRepository, orderRepository } from "../_repository/order.repo";

type GetOrderList = {
  session: SessionEntity;
};

class GetOrderListUseCase {
  constructor(private readonly orderRepo: OrderRepository) {}

  async exec(data: GetOrderList): Promise<Order[]> {
    const { session } = data;
    const { canGetOrder } = createOrderAbility(session);

    if (!canGetOrder()) {
      throw new AuthorizatoinError();
    }

    return await this.orderRepo.getOrderList();
  }
}

export const getOrderListUseCase = new GetOrderListUseCase(orderRepository);
