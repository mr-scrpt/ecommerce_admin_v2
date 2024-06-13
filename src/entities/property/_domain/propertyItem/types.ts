// NOTE: Base
export type PropertyItemBase = {
  name: string;
  value: string;
};

// NOTE: Entity
export type PropertyItemEntity = PropertyItemBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Projetions
export type PropertyItem = {
  id: string;
  name: string;
  value: string;
};

export type PropertyItemRelation = {
  id: string;
  propertyId: string;
  name: string;
  value: string;
  productList: Array<PropertyProduct>;
};

// NOTE: Selector
export type PropertyItemGetSelector = {
  id: string;
};

// NOTE: Side
type PropertyProduct = {
  id: string;
  // name: string;
  // slug: string;
  // img: string[];
  // createdAt: Date;
};

// export type PropertyItemCombineCreate = {
//   propertyId: string;
//   name: string;
//   value: string;
// };
//
// export type PropertyItemCombineUpdateOrCreate = {
//   propertyId: string;
//   id?: string;
//   name: string;
//   value: string;
// };
//
// export type PropertyItemToCreate = {
//   name: string;
//   value: string;
// };
//
// export type PropertyItemToUpdate = {
//   // propertyId: PropertyId;
//   id?: string;
//   name: string;
//   value: string;
// };
