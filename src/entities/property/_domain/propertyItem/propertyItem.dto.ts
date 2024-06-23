import { PropertyItemBase } from "./propertyItem.types";

// NOTE: Queries
export type PropertyItemGetDTO = {
  id: string;
};

export type PropertyItemListGetByProperyDTO = {
  propertyId: string;
};

// export type PropertyGetByCategoryIdListDTO = {
//   categoryIdList: Array<string>;
// };
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
export type PropertyItemCreateDTO = {
  data: PropertyItemBase & { propertyId: string };
};

// export type PropertyItemWithPropertyIdCreateDTO = {
//   data: PropertyItemBase & { propertyId: string };
// };

export type PropertyItemUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<PropertyItemBase & { propertyId: string }>;
};

export type PropertyItemUpdateOrCreateDTO = {
  selector: {
    id: string;
  };
  data: Partial<PropertyItemBase & { propertyId: string }>;
};

export type PropertyItemRemoveDTO = {
  selector: {
    id: string;
  };
};

export type PropertyItemRemoveByPropertyDTO = {
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
// export type PropertyItemBindToPropertyDTO = {
//   selector: {
//     id: string;
//   };
//   data: {
//     propertyId: string;
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
