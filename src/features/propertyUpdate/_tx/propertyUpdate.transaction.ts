import { PropertyEntity } from "@/entities/property";
import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { PropertyUpdateComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class PropertyUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly propertyRepo: PropertyRepository,
    private readonly propertyItemRepo: PropertyItemRepository,
  ) {
    super(dbClient);
  }

  async updatePropertyById(
    data: PropertyUpdateComplexible,
  ): Promise<PropertyEntity> {
    const { propertyId, propertyData, propertyItemListData } = data;
    const action = async (tx: Tx) => {
      await this.propertyRepo.updateProperty(propertyId, propertyData, tx);

      const propertyListOld = await this.propertyItemRepo.getPropertyItemList(
        propertyId,
        tx,
      );

      await Promise.all(
        propertyItemListData.map(async (itemData) => {
          await this.propertyItemRepo.updateOrCreatePropertyItem(
            { ...itemData, propertyId }, // Добавляем propertyId в данные перед вызовом функции
            tx,
          );
        }),
      );

      const itemsToDelete = propertyListOld.filter(
        (oldItem) =>
          !propertyItemListData.find((newItem) => newItem.id === oldItem.id),
      );

      await Promise.all(
        itemsToDelete.map(async (item) => {
          await this.propertyItemRepo.removePropertyItem(item.id, tx);
        }),
      );

      return await this.propertyRepo.getProperty(propertyId, tx);
    };

    return await this.start(action);
  }
}
