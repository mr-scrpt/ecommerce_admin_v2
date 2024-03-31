"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { FC, HTMLAttributes, createContext, useContext } from "react";
import { useGetOwnerOrderData } from "../_vm/getOwnerOrderData";
import Link from "next/link";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { OrderOwnerDataUI } from "../_domain/types";

interface UserInfoProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

type OrderOwnerData = FC<UserInfoProps> & {
  OwnerInfo: FC<HTMLAttributes<HTMLTableElement>>;
  OrderInfo: FC<HTMLAttributes<HTMLTableElement>>;
};

const OrderOwnerContext = createContext<OrderOwnerDataUI>({});

export const OrderOwnerData: OrderOwnerData = (props) => {
  const { orderId, children } = props;
  const { isSuccess, isPending, orderOwnerData } =
    useGetOwnerOrderData(orderId);
  const { owner, orderList } = orderOwnerData;

  // if (isPending) {
  //   return <div>Loading</div>;
  // }
  // if (!owner) {
  //   return <div>No user</div>;
  // }
  // if (!isSuccess) {
  //   return <div>No data</div>;
  // }

  // const { name, phone, email } = owner;

  return (
    <OrderOwnerContext.Provider value={orderOwnerData}>
      {children}
    </OrderOwnerContext.Provider>
  );
};

OrderOwnerData.OwnerInfo = function UserInfo(props) {
  const { className } = props;
  const { owner } = useContext(OrderOwnerContext);
  if (!owner) {
    return <div>No user</div>;
  }
  const { name, phone, email } = owner;
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

OrderOwnerData.OrderInfo = function OrderInfo(props) {
  const { className } = props;
  const { orderList } = useContext(OrderOwnerContext);
  if (!orderList) {
    return <div>No order</div>;
  }
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Order status</TableHead>
            <TableHead>Payed status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Link href={`${RoutePathEnum.ORDER_UPDATE}/${order.id}`}>
                  # {order.orderNo}
                </Link>
              </TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.priceTotal}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
