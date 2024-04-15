import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createDeliveryAbility } from "../_domain/delivery.ability";
import { DeliveryEntity } from "../_domain/delivery.types";
import { DeliveryRepository } from "../_repository/delivery.repo";

type GetDeliveryList = {
  session: SessionEntity;
};

@injectable()
export class GetDeliveryListUseCase {
  constructor(private readonly deliveryRepo: DeliveryRepository) {}

  async exec(data: GetDeliveryList): Promise<DeliveryEntity[]> {
    const { session } = data;
    const { canGetDelivery } = createDeliveryAbility(session);

    if (!canGetDelivery()) {
      throw new AuthorizatoinError();
    }

    return await this.deliveryRepo.getDeliveryList();
  }
}
