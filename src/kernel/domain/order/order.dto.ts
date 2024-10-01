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
  // | "userId"
  // | "receiverId"
  | "priceTotal"
  // | "orderStatusStateId"
  // | "orderStatusPaymentId"
  | "orderNo"
>;

export type OrderCreateEmptyDTO = {
  data: OrderCreateEmpty;
};

export type OrderCreateEmptyWithReceiverDTO = {
  data: OrderCreateEmpty & {
    receiverId: string;
    userId: string;
  };
};

export type OrderUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<OrderBase>;
};

export type OrderReceiverUpdateDTO = {
  selector: {
    id: string;
  };
  data: {
    receiverId: string;
  };
};
