import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createDeliveryAbility } from "../_domain/delivery.ability";
import { DeliveryEntity } from "../_domain/delivery.types";
import { DeliveryRepository } from "../_repository/delivery.repo";

type GetDelivery = {
  orderId: string;
  session: SessionEntity;
};

@injectable()
export class GetDeliveryByOrderIdUseCase {
  constructor(private readonly deliveryRepo: DeliveryRepository) {}

  async exec(data: GetDelivery): Promise<DeliveryEntity> {
    const { session, orderId } = data;
    const { canGetDelivery } = createDeliveryAbility(session);

    if (!canGetDelivery()) {
      throw new AuthorizatoinError();
    }

    return await this.deliveryRepo.getDeliveryByOrderId(orderId);
  }
}
