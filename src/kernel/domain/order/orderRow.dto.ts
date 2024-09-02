import { OrderRowBase } from "@/kernel/domain/order/orderRow.type";

// NOTE: Queries
export type OrderRowGetDTO = {
  id: string;
};

export type OrderRowGetByOrderProductDTO = {
  orderId: string;
  productId: string;
};

export type OrderRowListGetByOrderDTO = {
  orderId: string;
};

// export type OrderGetByOwnerDTO = {
//   ownerId: string;
// };

// NOTE: Mutations
type OrderRowCreate = Pick<
  OrderRowBase,
  "productId" | "priceFixed" | "quantity"
>;
export type OrderRowCreateDTO = {
  selector: {
    orderId: string;
  };
  data: OrderRowCreate;
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
