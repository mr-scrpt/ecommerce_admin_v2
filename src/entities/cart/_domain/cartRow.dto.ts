import { CartRowBase } from "./cartRow.types";

// NOTE: Queries
export type CartRowGetDTO = {
  id: string;
};

export type CartRowGetByProductDTO = {
  cartId: string;
  productId: string;
};

// NOTE: Mutations
export type CartRowCreateDTO = {
  data: CartRowBase;
};

export type CartRowChangeQuantityDTO = {
  selector: {
    id: string;
  };
  data: Pick<CartRowBase, "quantity">;
};

export type CartRowRemoveDTO = {
  selector: {
    id: string;
  };
};
