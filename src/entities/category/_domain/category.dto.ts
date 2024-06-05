import { CategoryBase } from "./types";

// NOTE: Queries
export type CategoryGetDTO = {
  id: string;
};

export type CategoryGetBySlugDTO = {
  slug: string;
};

// NOTE: Mutations
export type CategoryCreateDTO = {
  data: CategoryBase;
};

export type CategoryUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<CategoryBase>;
};

export type CategoryRemoveDTO = {
  selector: {
    id: string;
  };
};

export type CategoryRemoveBySlugDTO = {
  selector: {
    slug: string;
  };
};

// NOTE: Bindings
export type CategoryBindProductListDTO = {
  selector: {
    id: string;
  };
  data: {
    productListId: Array<{ productId: string }>;
  };
};

export type CategoryBindPropertyListDTO = {
  selector: {
    id: string;
  };
  data: {
    propertyListId: Array<{ propertyId: string }>;
  };
};
