import { PROPERTY_DATATYPE } from "@prisma/client";

import { PropertyItem, PropertyItemEntity } from "./propertyItem.type";
export { PROPERTY_DATATYPE } from "@prisma/client";

// NOTE: Base
export type PropertyBase = {
  name: string;
  datatype: PROPERTY_DATATYPE;
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
