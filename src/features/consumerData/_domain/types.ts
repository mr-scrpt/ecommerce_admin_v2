import { Consumer, ConsumerGetByOrderSelector } from "@/entities/consumer";
import { Order, OrderEntity, OrderUI } from "@/entities/order";
import { User, UserEntity } from "@/entities/user/user";

// export type OrderOwnerDataEntity = {
//   owner: UserEntity;
//   orderList: Array<OrderEntity>;
// };
//
// export type OrderOwnerData = {
//   owner: User;
//   orderList: Array<Order>;
// };
//
// export type OrderOwnerDataUI = {
//   owner?: User;
//   orderList?: Array<OrderUI>;
// };
//

// export type ConsumerDataGetByOrderTxPayload = {
//   selector: ConsumerGetByOrderSelector;
// };
//
// export type ConsumerDataGetByOrderTxDTO = {
//   selector: ConsumerGetByOrderSelector;
// };

export type ConsumerDataEntity = {
  consumerData: UserEntity;
  orderListData: Array<OrderEntity>;
};
export type ConsumerData = {
  consumerData: Consumer;
  orderListData: Array<Order>;
};
