import { PropertyEntity, PropertyId } from "@/entities/property";
import {
  PropertyItemRepository,
  PropertyRepository,
  propertyItemRepository,
  propertyRepository,
} from "@/entities/property/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

export class PropertyRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly propertyRepo: PropertyRepository,
    private readonly propertyItemRepo: PropertyItemRepository,
  ) {
    super(dbClient);
  }

  async removePropertyById(propertyId: PropertyId): Promise<PropertyEntity> {
    const action = async (tx: Tx) => {
      await this.propertyItemRepo.removePropertyRelation(propertyId, tx);

      return await this.propertyRepo.removePropertyById(propertyId, tx);
    };

    return await this.start(action);
  }
}

export const propertyRemoveTx = new PropertyRemoveTx(
  dbClient,
  propertyRepository,
  propertyItemRepository,
);
