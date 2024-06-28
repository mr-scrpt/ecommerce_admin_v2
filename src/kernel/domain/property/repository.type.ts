import { Tx } from "@/shared/lib/db/db";
import {
  PropertyCreateDTO,
  PropertyGetByCategoryIdListDTO,
  PropertyGetDTO,
  PropertyRemoveDTO,
  PropertyUpdateDTO,
} from "./property.dto";
import { PropertyEntity } from "./property.type";
import {
  PropertyItemCreateDTO,
  PropertyItemGetDTO,
  PropertyItemListGetByProperyDTO,
  PropertyItemRemoveByPropertyDTO,
  PropertyItemRemoveDTO,
  PropertyItemUpdateDTO,
} from "./propertyItem.dto";
import { PropertyItemEntity } from "./propertyItem.type";

export abstract class IPropertyRepository {
  abstract get(dto: PropertyGetDTO, db?: Tx): Promise<PropertyEntity>;

  abstract getWithRelation<T>(dto: PropertyGetDTO, db?: Tx): Promise<T>;

  abstract getWithRelationByCategoryIdList<T>(
    dto: PropertyGetByCategoryIdListDTO,
    db?: Tx,
  ): Promise<T[]>;

  abstract getList(db?: Tx): Promise<PropertyEntity[]>;

  abstract create(dto: PropertyCreateDTO, db?: Tx): Promise<PropertyEntity>;

  abstract update(dto: PropertyUpdateDTO, db?: Tx): Promise<PropertyEntity>;

  abstract remove(dto: PropertyRemoveDTO, db?: Tx): Promise<PropertyEntity>;
}

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
