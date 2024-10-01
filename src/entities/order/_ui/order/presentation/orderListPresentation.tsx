"use client";
import { FC, HTMLAttributes } from "react";
import { OrderRelation } from "../../..";
import {
  OrderListContext,
  useOrderListData,
} from "../../../_vm/order/order.provider";
import { OrderTable } from "./elements/orderTable";

interface OrderListPresentationProps extends HTMLAttributes<HTMLDivElement> {
  orderList: Array<OrderRelation>;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
}

type OrderListPresentationType = FC<OrderListPresentationProps> & {
  Tabel: FC<HTMLAttributes<HTMLTableElement>>;
};

export const OrderListPresentation: OrderListPresentationType = (props) => {
  const { orderList, children, isPending, isSuccess, isFetchedAfterMount } =
    props;

  return (
    <OrderListContext.Provider value={orderList}>
      {children}
    </OrderListContext.Provider>
  );
};

OrderListPresentation.Tabel = function OrderPresentation(props) {
  const { className } = props;

  const orderList = useOrderListData();

  return <OrderTable orderList={orderList} className={className} />;
};
