import { PropertyEntity } from "@/entities/property";
import {
  PropertyItemRepository,
  PropertyRepository,
  propertyItemRepository,
  propertyRepository,
} from "@/entities/property/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { PropertyCreateComplexible } from "../_domain/types";

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

export const propertyCreateTx = new PropertyCreateTx(
  dbClient,
  propertyRepository,
  propertyItemRepository,
);
