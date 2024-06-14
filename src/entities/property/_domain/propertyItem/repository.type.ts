import { Tx } from "@/shared/lib/db/db";
import {
  PropertyItemCreateDTO,
  PropertyItemGetDTO,
  PropertyItemListGetByProperyDTO,
  PropertyItemRemoveByPropertyDTO,
  PropertyItemRemoveDTO,
  PropertyItemUpdateDTO,
} from "./propertyItem.dto";
import { PropertyItemEntity } from "./types";

export abstract class IPropertyItemRepository {
  abstract get(dto: PropertyItemGetDTO, db?: Tx): Promise<PropertyItemEntity>;

  abstract getListByProperty(
    dto: PropertyItemListGetByProperyDTO,
    db?: Tx,
  ): Promise<PropertyItemEntity[]>;

  abstract create(
    dto: PropertyItemCreateDTO,
    db?: Tx,
  ): Promise<PropertyItemEntity>;

  abstract update(
    dto: PropertyItemUpdateDTO,
    db?: Tx,
  ): Promise<PropertyItemEntity>;

  abstract remove(
    dto: PropertyItemRemoveDTO,
    db?: Tx,
  ): Promise<PropertyItemEntity>;

  abstract removeByProperty(
    dto: PropertyItemRemoveByPropertyDTO,
    db?: Tx,
  ): Promise<void>;
}