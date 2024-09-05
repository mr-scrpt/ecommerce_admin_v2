import { DeliveryTypeEntity } from "@/kernel/domain/delivery/deliveryType.type";
import { IDeliveryTypeRepository } from "@/kernel/domain/delivery/repository.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class DeliveryTypeRepository implements IDeliveryTypeRepository {
  constructor(readonly db: DBClient) {}

  async getList(db: Tx = this.db): Promise<DeliveryTypeEntity[]> {
    const deliveryList = await db.deliveryType.findMany();
    return deliveryList;
  }
}
