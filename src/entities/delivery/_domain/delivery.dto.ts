import { DeliveryBase } from "./delivery.types";

// NOTE: Queries
export type DeliveryGetDTO = {
  id: string;
};

export type DeliveryGetByOrderDTO = {
  orderId: string;
};

// NOTE: Mutations
export type DeliveryCreateDTO = DeliveryBase;

export type DeliveryUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<DeliveryBase>;
};

// export type DeliveryRemoveDTO = {
//   selector: {
//     id: string;
//   };
// };
//
// export type DeliveryAddProductListDTO = {
//   selector: {
//     id: string;
//   };
//   data: {
//     productListId: Array<{ id: string }>;
//   };
// };
//
// export type DeliveryAddPropertyListDTO = {
//   id: string;
//   propertyListId: Array<{ id: string }>;
// };
