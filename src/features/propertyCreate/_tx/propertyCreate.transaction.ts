import { PropertyEntity } from "@/entities/property";
import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { PropertyCreateComplexible } from "../_domain/types";

@injectable()
export class PropertyCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly propertyRepo: PropertyRepository,
    private readonly propertyItemRepo: PropertyItemRepository,
  ) {
    super(dbClient);
  }

  async createPropertyComplexible(
    data: PropertyCreateComplexible,
  ): Promise<PropertyEntity> {
    const action = async (tx: Tx) => {
      const { propertyItemListData, propertyData } = data;

      const propertyCreated = await this.propertyRepo.createProperty(
        propertyData,
        tx,
      );

      const propertyItemListCreated = [];

      for await (const item of propertyItemListData) {
        const itemCreated = await this.propertyItemRepo.createPropertyItem(
          { ...item, propertyId: propertyCreated.id },
          tx,
        );
        propertyItemListCreated.push(itemCreated);
      }

      return await this.propertyRepo.getProperty(propertyCreated.id, tx);
    };

    return await this.start(action);
  }
}
