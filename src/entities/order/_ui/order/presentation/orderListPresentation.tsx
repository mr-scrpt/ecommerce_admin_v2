"use client";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { OrderTable } from "./elements/orderTable";
import {
  OrderListPresentationProps,
  orderDataListInjector,
} from "../../../_hoc/withOrderListData.hoc";
import {
  OrderListContext,
  useOrderListData,
} from "../../../_vm/order/order.provider";
import { useOrderListWithRelationByOrderModel } from "@/entities/order";

const OrderListPresentationBase: FC<OrderListPresentationProps> = (props) => {
  const { children, orderList, isPending } = props;

  if (isPending) return <Spinner />;

  return (
    <OrderListContext.Provider value={orderList}>
      {children}
    </OrderListContext.Provider>
  );
};

const Tabel: FC<HTMLAttributes<HTMLTableElement>> = (props) => {
  const { className } = props;

  const orderList = useOrderListData();

  return <OrderTable orderList={orderList} className={className} />;
};

const List: FC<HTMLAttributes<HTMLUListElement>> = (props) => {
  const { className } = props;
  const orderList = useOrderListData();
  return (
    <ul className={cn("flex list-inside list-disc flex-col gap-2", className)}>
      {orderList.map((order) => (
        <li key={order.id} className="text-sm">
          {order.id}
        </li>
      ))}
    </ul>
  );
};

const DataListByOrder = orderDataListInjector<{ orderId: string }>(
  ({ orderId }) => useOrderListWithRelationByOrderModel(orderId),
)(OrderListPresentationBase);

export const OrderListPresentation = Object.assign(OrderListPresentationBase, {
  DataListByOrder,
  Tabel,
  List,
});
