"use client";
import { RoutePathEnum } from "@/shared/config/routing.config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { useGetOwnerOrderDataModel } from "../_vm/getOwnerOrderData.model";
import {
  orderOwnerContext,
  useOrderInfo,
  useOwnerInfo,
} from "../_vm/orderOwnerContext.model";

interface ConsumerDataProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

type ConsumerDataType = FC<ConsumerDataProps> & {
  OwnerInfo: FC<HTMLAttributes<HTMLTableElement>>;
  OrderInfo: FC<HTMLAttributes<HTMLTableElement>>;
};

export const ConsumerData: ConsumerDataType = (props) => {
  const { orderId, children } = props;
  const { orderOwnerData, isSuccess, isPending } =
    useGetOwnerOrderDataModel(orderId);

  if (isPending && !isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <orderOwnerContext.Provider value={orderOwnerData}>
      {children}
    </orderOwnerContext.Provider>
  );
};

ConsumerData.OwnerInfo = function UserInfo(props) {
  const { className } = props;
  const owner = useOwnerInfo();

  if (!owner) {
    return <div>No user!</div>;
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

ConsumerData.OrderInfo = function OrderInfo(props) {
  const { className } = props;
  const orderList = useOrderInfo();

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
