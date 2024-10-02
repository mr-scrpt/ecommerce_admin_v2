"use client";
import { FC, HTMLAttributes } from "react";
import {
  OrderPresentationProps,
  orderDataInjector,
} from "../../../_hoc/withOrderData.hoc";
import { OrderContext, useOrderData } from "../../../_vm/order/order.provider";
import { OrderTable } from "./elements/orderTable";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useOrderWithRelationModel } from "../../../_vm/order/useOrderWithRelation.model";

const OrderPresentationBase: FC<OrderPresentationProps> = (props) => {
  const { children, order, isPending } = props;

  if (isPending) return <Spinner />;

  return (
    <OrderContext.Provider value={order}>{children}</OrderContext.Provider>
  );
};

const Tabel: FC<HTMLAttributes<HTMLTableElement>> = (props) => {
  const { className } = props;
  const order = useOrderData();
  const orderList = Array.isArray(order) ? order : order ? [order] : [];
  return <OrderTable orderList={orderList} className={className} />;
};

const List: FC<HTMLAttributes<HTMLUListElement>> = (props) => {
  const { className } = props;
  const order = useOrderData();
  const orderList = Array.isArray(order) ? order : order ? [order] : [];
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {orderList.map((order) => (
        <li key={order.id} className="text-sm">
          {order.name}
        </li>
      ))}
    </ul>
  );
};

const Data = orderDataInjector<{ orderId: string }>(({ orderId }) =>
  useOrderWithRelationModel(orderId),
)(OrderPresentationBase);

export const OrderPresentation = Object.assign(OrderPresentationBase, {
  Tabel,
  List,
  Data,
});
