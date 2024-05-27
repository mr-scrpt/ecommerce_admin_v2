import { PropertyEntity, PropertyId } from "@/entities/property";
import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class PropertyRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly propertyRepo: PropertyRepository,
    private readonly propertyItemRepo: PropertyItemRepository,
  ) {
    super(db);
  }

  async removePropertyById(propertyId: PropertyId): Promise<PropertyEntity> {
    const action = async (tx: Tx) => {
      await this.propertyItemRepo.removePropertyRelation(propertyId, tx);

      return await this.propertyRepo.removePropertyById(propertyId, tx);
    };

    return await this.start(action);
  }
}
