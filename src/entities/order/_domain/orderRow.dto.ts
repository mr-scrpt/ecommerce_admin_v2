import { OrderBase } from "./order.types";
import { OrderRowBase } from "./orderRow.types";

// NOTE: Queries
export type OrderRowGetDTO = {
  id: string;
};

export type OrderRowListGetByOrderDTO = {
  orderId: string;
};

// export type OrderGetByOwnerDTO = {
//   ownerId: string;
// };

// NOTE: Mutations

export type OrderRowCreateDTO = {
  data: OrderRowBase;
};

export type OrderRowUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<OrderRowBase>;
};

export type OrderRowRemoveDTO = {
  selector: {
    id: string;
  };
};

// export type OrderUpdateDTO = {
//   selector: {
//     id: string;
//   };
//   data: Partial<OrderBase>;
// };
