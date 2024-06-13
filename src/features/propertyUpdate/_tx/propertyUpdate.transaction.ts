import { PropertyEntity } from "@/entities/property";
import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { PropertyUpdateComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class PropertyUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly propertyRepo: PropertyRepository,
    private readonly propertyItemRepo: PropertyItemRepository,
  ) {
    super(db);
  }

  async updatePropertyById(
    data: PropertyUpdateComplexible,
  ): Promise<PropertyEntity> {
    const { propertyId, propertyData, propertyItemListData } = data;
    const action = async (tx: Tx) => {
      await this.propertyRepo.update(propertyId, propertyData, tx);

      const propertyListOld = await this.propertyItemRepo.getListByProperty(
        propertyId,
        tx,
      );

      await Promise.all(
        propertyItemListData.map(async (itemData) => {
          await this.propertyItemRepo.updateOrCreate(
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
          await this.propertyItemRepo.remove(item.id, tx);
        }),
      );

      return await this.propertyRepo.get(propertyId, tx);
    };

    return await this.start(action);
  }
}
