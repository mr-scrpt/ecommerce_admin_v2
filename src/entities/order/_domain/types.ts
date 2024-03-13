export const baseQueryKey = "order";
export type OrderId = string;
export type OrderSlug = string;

export type OrderEntity = {
  id: OrderId;
  userId: string;
  createdAt: Date;
};

export type OrderRowEntity = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
};

export type OrderRelationEntity = OrderEntity & {
  orderRowList: Array<OrderRowEntity>;
};

// Projetions

export type Order = {
  id: OrderId;
  userId: string;
};

export type OrderRelation = Order & {
  orderRowList: Array<OrderRowEntity>;
};

export type OrderToCreate = {
  userId: string;
};

// export type OrderToUpdate = {
//   id: OrderId;
//   productList: Array<OrderProduct>;
// };
export type OrderToAddProduct = {
  id: OrderId;
  productId: string;
};

// OrderRow
export type OrderRowGetByProductId = {
  orderId: string;
  productId: string;
};

export type OrderRowChangeQuantity = {
  id: string;
  quantity: number;
};

export type OrderRowToAddProduct = {
  orderId: string;
  productId: string;
  // quantity: number;
};

export type OrderRowToRemoveProduct = {
  orderId: string;
  productId: string;
};

// Side
// export type OrderRow = {
//   id: string;
//   // name: string;
// };
