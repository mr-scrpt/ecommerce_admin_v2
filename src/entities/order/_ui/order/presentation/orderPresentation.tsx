"use client";
import { FC, HTMLAttributes } from "react";
import { OrderContext, useOrderData } from "../../../_vm/order/order.provider";
import { OrderRelation } from "./../../../_domain/order/order.types";
import { OrderTable } from "./elements/orderTable";

interface OrderPresentationProps extends HTMLAttributes<HTMLDivElement> {
  order: OrderRelation;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
}

type OrderPresentationType = FC<OrderPresentationProps> & {
  Tabel: FC<HTMLAttributes<HTMLTableElement>>;
};

export const OrderPresentation: OrderPresentationType = (props) => {
  const { order, children, isPending, isSuccess, isFetchedAfterMount } = props;

  return (
    <OrderContext.Provider value={order}>{children}</OrderContext.Provider>
  );
};

OrderPresentation.Tabel = function OrderPresentation(props) {
  const { className } = props;

  const order = useOrderData();

  const orderList = Array.isArray(order) ? order : order ? [order] : [];

  return <OrderTable orderList={orderList} className={className} />;
};
