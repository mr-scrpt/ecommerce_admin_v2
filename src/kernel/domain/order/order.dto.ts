import { OrderBase } from "./order.type";

// NOTE: Queries
export type OrderGetDTO = {
  id: string;
};

export type OrderGetByConsumerDTO = {
  consumerId: string;
};

// NOTE: Mutations
type OrderCreateEmpty = Pick<
  OrderBase,
  | "userId"
  | "receiverId"
  | "priceTotal"
  | "paymentStatus"
  | "orderStatus"
  | "orderNo"
>;

export type OrderCreateEmptyDTO = {
  data: OrderCreateEmpty;
};

export type OrderUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<OrderBase>;
};
