import { Order, OrderEntity } from "@/entities/order";
import { User, UserEntity } from "@/entities/user/user";

export const baseQueryKey = "orderOwnerData";
export type OrderOwnerDataEntity = {
  owner: UserEntity;
  orderList: Array<OrderEntity>;
};

export type OrderOwnerData = {
  owner: User;
  orderList: Array<Order>;
};
