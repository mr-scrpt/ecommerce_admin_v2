import { CartBase } from "./cart.types";

// NOTE: Queries
export type CartGetDTO = {
  id: string;
};

export type CartGetByUserDTO = {
  userId: string;
};

// NOTE: Mutations
export type CartCreateDTO = {
  data: CartBase;
};

export type CartRemoveDTO = {
  selector: {
    id: string;
  };
};

export type CartRemoveByUserDTO = {
  selector: {
    userId: string;
  };
};
