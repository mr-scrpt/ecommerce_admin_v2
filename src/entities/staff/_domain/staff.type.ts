import { CartComposite } from "@/kernel/domain/cart/cart.type";
import { Staff, StaffEntity } from "@/kernel/domain/staff/staff.type";
import { Order, OrderEntity } from "@/kernel/domain/order/order.type";

// NOTE: Relation
export type StaffRelation = Staff & {
  orderList: Array<Order>;
  cart: CartComposite | null;
  // TODO: Add reciver
  receiverList: Array<any>;
};

export type StaffRelationEntity = StaffEntity & {
  orderList: Array<OrderEntity>;
  cart: CartComposite | null;
  // TODO: Add reciver
  receiverList: Array<any>;
};

// NOTE: Selector
export type StaffGetSelector = {
  id: string;
};

export type StaffGetByOrderSelector = {
  orderId: string;
};

export type StaffSearchSelector = {
  q: string;
};

// NOTE: UI
// export type StaffRelationUI = {
//   staff?: StaffUI;
//   orderList?: Array<OrderUI>;
//   cart?: CartComposite | null;
//   // TODO: Add reciver
//   receiverList?: Array<any>;
// };
