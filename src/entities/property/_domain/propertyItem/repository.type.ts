import { Tx } from "@/shared/lib/db/db";
import {
  PropertyItemCreateDTO,
  PropertyItemGetDTO,
  PropertyItemListGetByProperyDTO,
  PropertyItemRemoveByPropertyDTO,
  PropertyItemRemoveDTO,
  PropertyItemUpdateOrCreateDTO,
} from "./propertyItem.dto";
import { PropertyItemEntity } from "./types";
import { PropertyItemUpdateDTO } from "../../_domain/propertyItem/propertyItem.dto";

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

  // abstract updateOrCreate(
  //   dto: PropertyItemUpdateOrCreateDTO,
  //   db?: Tx,
  // ): Promise<PropertyItemEntity>;

  abstract remove(
    dto: PropertyItemRemoveDTO,
    db?: Tx,
  ): Promise<PropertyItemEntity>;

  abstract removeByProperty(
    dto: PropertyItemRemoveByPropertyDTO,
    db?: Tx,
  ): Promise<void>;
}
