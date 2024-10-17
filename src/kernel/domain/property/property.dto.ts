import { PropertyBase } from "./property.type";

// NOTE: Queries
export type PropertyGetDTO = {
  id: string;
};

// export type PropertyGetListByIdDTO = {
//   idList: Array<string>;
// };

export type PropertyGetByCategoryDTO = {
  categoryId: string;
};

export type PropertyGetByCategoryIdListDTO = {
  categoryIdList: Array<{ categoryId: string }>;
};
//
// export type PropertyGetBySlugDTO = {
//   slug: string;
// };
//
// export type PropertySearchDTO = {
//   q: string;
// };
//
// export type PropertyTotalPriceGetDTO = {
//   idList: Array<string>;
// };

// NOTE: Mutations
export type PropertyCreateDTO = {
  data: PropertyBase;
};

export type PropertyUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<PropertyBase>;
};

export type PropertyRemoveDTO = {
  selector: {
    id: string;
  };
};

// export type PropertyRemoveBySlugDTO = {
//   selector: {
//     slug: string;
//   };
// };

// NOTE: Bindings
// export type PropertyBindCategoryListListDTO = {
//   selector: {
//     id: string;
//   };
//   data: {
//     categoryListId: Array<{ categoryId: string }>;
//   };
// };
//
// export type PropertyBindPropertyListDTO = {
//   selector: {
//     id: string;
//   };
//   data: {
//     propertyItemListId: Array<{ propertyItemId: string }>;
//   };
// };
