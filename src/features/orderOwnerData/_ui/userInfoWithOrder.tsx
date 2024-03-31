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
import { FC, HTMLAttributes } from "react";
import { useGetOwnerOrderData } from "../_vm/getOwnerOrderData";
import Link from "next/link";
import { RoutePathEnum } from "@/shared/config/routing.config";

interface UserInfoProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const UserInfoWithOrder: FC<UserInfoProps> = (props) => {
  const { orderId } = props;
  const { isSuccess, isPending, orderOwnerData } =
    useGetOwnerOrderData(orderId);
  const { owner, orderList } = orderOwnerData;

  if (isPending) {
    return <div>Loading</div>;
  }
  if (!owner) {
    return <div>No user</div>;
  }
  if (!isSuccess) {
    return <div>No data</div>;
  }

  const { name, phone, email } = owner;

  return (
    <div className="flex w-full flex-col gap-4">
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

      {orderList && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
