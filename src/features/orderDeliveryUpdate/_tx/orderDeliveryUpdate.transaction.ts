import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderDeliveryUpdateComplexible } from "../_domain/types";
import { DeliveryRepository } from "@/entities/delivery/server";
import { DeliveryEntity } from "@/entities/delivery";

@injectable()
export class OrderDeliveryUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly deliveryRepo: DeliveryRepository,
  ) {
    super(db);
  }

  async updateDelivery(
    deliveryToUpdate: OrderDeliveryUpdateComplexible,
  ): Promise<DeliveryEntity> {
    const { deliveryId, deliveryData } = deliveryToUpdate;
    const action = async (tx: Tx) => {
      return await this.deliveryRepo.updateDelivery(
        deliveryId,
        deliveryData,
        tx,
      );
    };

    return await this.start(action);
  }
}
