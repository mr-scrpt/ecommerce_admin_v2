import { Tx } from "@/shared/lib/db/db";
import {
  PropertyCreateDTO,
  PropertyGetByCategoryDTO,
  PropertyGetByCategoryIdListDTO,
  PropertyGetDTO,
  PropertyGetListByIdDTO as PropertyGetListByIdListDTO,
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
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";

export abstract class IPropertyRepository {
  abstract get(
    dto: PropertyGetDTO,
    db?: Tx,
  ): Promise<Either<ErrorApp, PropertyEntity>>;

  abstract getWithRelation<T>(dto: PropertyGetDTO, db?: Tx): Promise<T>;

  abstract getWithRelationByCategoryIdList<T>(
    dto: PropertyGetByCategoryIdListDTO,
    db?: Tx,
  ): Promise<T[]>;

  abstract getList(db?: Tx): Promise<PropertyEntity[]>;
  // abstract getListById(
  //   dto: PropertyGetListByIdListDTO,
  //   db?: Tx,
  // ): Promise<PropertyEntity[]>;

  abstract getListByCategory(
    dto: PropertyGetByCategoryDTO,
    db?: Tx,
  ): Promise<Array<PropertyEntity>>;

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
