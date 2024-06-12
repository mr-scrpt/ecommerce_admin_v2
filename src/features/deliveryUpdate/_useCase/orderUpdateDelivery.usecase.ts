import { ForbiddenError } from "@/shared/lib/errors";
import { injectable } from "inversify";
import { DeliveryUpdateTx } from "../_tx/orderDeliveryUpdate.transaction";
import { DeliveryEntity, DeliveryToUpdate } from "@/entities/delivery";
import { SessionEntity } from "@/shared/lib/user";
import { createDeliveryAbility } from "@/entities/delivery/server";

type OrderUpdateDelivery = {
  deliveryId: string;
  deliveryData: DeliveryToUpdate;
  session: SessionEntity;
};

@injectable()
export class OrderUpdateDeliveryUseCase {
  constructor(private readonly deliveryUpdateTx: DeliveryUpdateTx) {}

  async exec(data: OrderUpdateDelivery): Promise<DeliveryEntity> {
    const { deliveryId, deliveryData, session } = data;
    const { canUpdateDelivery } = createDeliveryAbility(session);

    if (!canUpdateDelivery()) {
      throw new ForbiddenError();
    }

    return await this.deliveryUpdateTx.updateDelivery({
      deliveryId,
      deliveryData,
    });
  }
}
