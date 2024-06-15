import { Property } from "@/entities/property";
import { injectable } from "inversify";
import { IPropertyUpdateTx } from "../_domain/transaction.type";
import {
  PropertyItemCreateData,
  PropertyItemUpdateData,
  PropertyUpdateTxDTO,
  PropertyUpdateTxPayload,
} from "../_domain/types";
import { merge, omit } from "lodash";

type PropertyItemList = PropertyUpdateTxPayload["propertyItemListData"];
@injectable()
export class PropertyUpdateService {
  constructor(private readonly propertyUpdateTx: IPropertyUpdateTx) {}

  async execute(payload: PropertyUpdateTxPayload): Promise<Property> {
    const propertyUpdateDTO = this.build(payload);
    return await this.propertyUpdateTx.update(propertyUpdateDTO);
  }

  build(payload: PropertyUpdateTxPayload): PropertyUpdateTxDTO {
    const { propertyItemListData } = payload;
    const [propertyItemListCreateData, propertyItemListUpdateData] =
      this.filterItems(propertyItemListData);

    const build = omit(
      merge({}, payload, {
        propertyItemListCreateData,
        propertyItemListUpdateData,
      }),
      ["propertyItemListData"],
    );

    return build;
  }

  filterItems(
    propertyItemList: PropertyItemList,
  ): [Array<PropertyItemCreateData>, Array<PropertyItemUpdateData>] {
    const listToCreate: Array<PropertyItemCreateData> = [];
    const listToUpdate: Array<PropertyItemUpdateData> = [];

    for (const item of propertyItemList) {
      if (!item.id) {
        if (!item.name || !item.value) {
          throw new Error(
            `Item without id must have both name and value. Invalid item: ${JSON.stringify(item)}`,
          );
        }
        listToCreate.push(item as PropertyItemCreateData);
      }
      if (item.id) {
        if (!item.name && !item.value) {
          throw new Error(
            `Item without id must have both name and value. Invalid item: ${JSON.stringify(item)}`,
          );
        }
        listToUpdate.push(item as PropertyItemUpdateData);
      }
    }

    return [listToCreate, listToUpdate];
  }
}
