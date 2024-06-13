import { ProductBase } from "./types";

// NOTE: Queries
export type ProductGetDTO = {
  id: string;
};

export type ProductGetByIdListDTO = {
  idList: Array<{ id: string }>;
};

export type ProductGetBySlugDTO = {
  slug: string;
};

export type ProductSearchDTO = {
  q: string;
};

export type ProductTotalPriceGetDTO = {
  idList: Array<{ id: string }>;
};

// NOTE: Mutations
export type ProductCreateDTO = {
  data: ProductBase;
};

export type ProductUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<ProductBase>;
};

export type ProductRemoveDTO = {
  selector: {
    id: string;
  };
};

export type ProductRemoveBySlugDTO = {
  selector: {
    slug: string;
  };
};

// NOTE: Bindings
export type ProductBindCategoryListListDTO = {
  selector: {
    id: string;
  };
  data: {
    categoryListId: Array<{ categoryId: string }>;
  };
};

export type ProductBindPropertyListDTO = {
  selector: {
    id: string;
  };
  data: {
    propertyItemListId: Array<{ propertyItemId: string }>;
  };
};
