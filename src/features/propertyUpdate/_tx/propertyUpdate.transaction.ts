import { PropertyEntity } from "@/entities/property";
import {
  IPropertyItemRepository,
  IPropertyRepository,
} from "@/entities/property/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IPropertyUpdateTx } from "../_domain/transaction.type";
import { PropertyUpdateTxDTO } from "../_domain/types";

@injectable()
export class PropertyUpdateTx extends Transaction implements IPropertyUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly propertyRepo: IPropertyRepository,
    private readonly propertyItemRepo: IPropertyItemRepository,
  ) {
    super(db);
  }

  async update(dto: PropertyUpdateTxDTO): Promise<PropertyEntity> {
    const {
      selector,
      propertyData,
      propertyItemListCreateData,
      propertyItemListUpdateData,
    } = dto;
    const { id: propertyId } = selector;

    const action = async (tx: Tx) => {
      await this.propertyRepo.update({ selector, data: propertyData }, tx);

      const propertyListOld = await this.propertyItemRepo.getListByProperty(
        { propertyId },
        tx,
      );

      const itemsToDelete = propertyListOld.filter(
        (oldItem) =>
          !propertyItemListUpdateData.find(
            (newItem) => newItem.id === oldItem.id,
          ),
      );

      await Promise.all(
        propertyItemListCreateData.map(async (itemData) => {
          await this.propertyItemRepo.create(
            { data: { ...itemData, propertyId } },
            tx,
          );
        }),
      );

      await Promise.all(
        itemsToDelete.map(async (item) => {
          await this.propertyItemRepo.remove({ selector: { id: item.id } }, tx);
        }),
      );

      await Promise.all(
        propertyItemListUpdateData.map(async (itemData) => {
          await this.propertyItemRepo.update(
            { selector: { id: itemData.id }, data: itemData },
            tx,
          );
        }),
      );

      return await this.propertyRepo.get({ id: propertyId }, tx);
    };

    return await this.start(action);
  }
}
