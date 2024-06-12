import { DeliveryEntity } from "@/entities/delivery";
import { IDeliveryRepository } from "@/entities/delivery/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IDeliveryUpdateTx } from "../_domain/transaction.type";
import { DeliveryUpdateTxDTO } from "../_domain/types";

@injectable()
export class DeliveryUpdateTx extends Transaction implements IDeliveryUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly deliveryRepo: IDeliveryRepository,
  ) {
    super(db);
  }

  async update(dto: DeliveryUpdateTxDTO): Promise<DeliveryEntity> {
    const { selector, deliveryData } = dto;

    const action = async (tx: Tx) => {
      await this.deliveryRepo.update({ selector, data: deliveryData }, tx);

      return await this.deliveryRepo.get(selector, tx);
    };

    return await this.start(action);
  }
}
