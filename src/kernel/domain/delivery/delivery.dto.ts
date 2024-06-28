import { DeliveryBase } from "@/kernel/domain/delivery/delivery.type";

// NOTE: Queries
export type DeliveryGetDTO = {
  id: string;
};

export type DeliveryGetByOrderDTO = {
  orderId: string;
};

// NOTE: Mutations
export type DeliveryCreateDTO = { data: DeliveryBase };

export type DeliveryUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<DeliveryBase>;
};

// NOTE: Bindings
export type DeliveryBindToOrderDTO = {
  selector: {
    id: string;
  };
  target: {
    orderId: string;
  };
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
