import { DATATYPE as PropertyDataTypeEnum } from "@prisma/client";
import { PropertyItem, PropertyItemEntity } from "./propertyItem.type";
export { PropertyDataTypeEnum };

// NOTE: Base
export type PropertyBase = {
  name: string;
  datatype: PropertyDataTypeEnum;
};

// NOTE: Entity
export type PropertyEntity = PropertyBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyCompositeEntity = PropertyEntity & {
  propertyItemList: Array<PropertyItemEntity>;
};

// NOTE: Projetions
export type Property = PropertyBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyComposite = Property & {
  propertyItemList: Array<PropertyItem>;
};
