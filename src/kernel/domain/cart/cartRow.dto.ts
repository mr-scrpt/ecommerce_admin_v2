import { CartRow, CartRowBase } from "./cartRow.types";

// NOTE: Queries
export type CartRowGetDTO = {
  id: string;
};

export type CartRowGetByProductDTO = {
  cartId: string;
  productId: string;
};

// NOTE: Mutations
type CartRowCreate = Pick<CartRow, "productId" | "quantity">;
export type CartRowCreateDTO = {
  target: {
    cartId: string;
  };
  data: CartRowCreate;
};

export type CartRowUpdateDTO = {
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
