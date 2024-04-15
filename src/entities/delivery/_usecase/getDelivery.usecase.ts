import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createDeliveryAbility } from "../_domain/delivery.ability";
import { DeliveryEntity } from "../_domain/delivery.types";
import { DeliveryRepository } from "../_repository/delivery.repo";

type GetDelivery = {
  deliveryId: string;
  session: SessionEntity;
};

@injectable()
export class GetDeliveryUseCase {
  constructor(private readonly deliveryRepo: DeliveryRepository) {}

  async exec(data: GetDelivery): Promise<DeliveryEntity> {
    const { session, deliveryId } = data;
    const { canGetDelivery } = createDeliveryAbility(session);

    if (!canGetDelivery()) {
      throw new AuthorizatoinError();
    }
    console.log("output_log:  =>>>", deliveryId);

    return await this.deliveryRepo.getDelivery(deliveryId);
  }
}
