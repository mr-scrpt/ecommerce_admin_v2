import { AddressBase } from "./address.type";

// NOTE: Queries
export type AddressGetDTO = {
  id: string;
};

export type AddressGetByUserDTO = {
  userId: string;
};

// NOTE: Mutations
export type AddressCreateDTO = {
  data: AddressBase;
};

export type AddressUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<AddressBase>;
};

export type AddressRemoveDTO = {
  selector: {
    id: string;
  };
};

// NOTE: Bindings
export type AddressBindToDeliveryListDTO = {
  target: {
    id: string;
  };
  data: {
    deliveryListId: Array<{ deliveryId: string }>;
  };
};
