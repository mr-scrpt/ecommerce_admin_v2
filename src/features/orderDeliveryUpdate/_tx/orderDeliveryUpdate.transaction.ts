import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
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
    super(dbClient);
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
