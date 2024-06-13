import { Tx } from "@/shared/lib/db/db";
import {
  PropertyCreateDTO,
  PropertyGetByCategoryIdListDTO,
  PropertyGetDTO,
  PropertyRemoveDTO,
  PropertyUpdateDTO,
} from "./property.dto";
import { PropertyEntity, PropertyRelationEntity } from "./types";

export abstract class IPropertyRepository {
  abstract get(dto: PropertyGetDTO, db?: Tx): Promise<PropertyEntity>;

  abstract getWithRelation(
    dto: PropertyGetDTO,
    db?: Tx,
  ): Promise<PropertyRelationEntity>;

  abstract getWithRelationByCategoryIdList(
    dto: PropertyGetByCategoryIdListDTO,
    db?: Tx,
  ): Promise<PropertyRelationEntity[]>;

  abstract getList(db?: Tx): Promise<PropertyEntity[]>;

  abstract create(dto: PropertyCreateDTO, db?: Tx): Promise<PropertyEntity>;

  abstract update(dto: PropertyUpdateDTO, db?: Tx): Promise<PropertyEntity>;

  abstract remove(dto: PropertyRemoveDTO, db?: Tx): Promise<PropertyEntity>;
}
