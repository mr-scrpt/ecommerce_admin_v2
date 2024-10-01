import { OrderRelation } from "@/entities/order";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { buildDate } from "@/shared/lib/date";
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

interface OrderTableProps extends HTMLAttributes<HTMLDivElement> {
  orderList: Array<OrderRelation>;
}

export const OrderTable: FC<OrderTableProps> = (props) => {
  const { className, orderList } = props;

  // const {
  //   orderNo,
  //   orderStatusState,
  //   orderStatusPayment,
  //   priceTotal,
  //   receiver,
  //   id,
  // } = order;
  //
  // const { status: orderState } = orderStatusState;
  // const { status: orderPayment } = orderStatusPayment;
  // const { createdAt } = order;

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.map((order) => {
            const {
              orderNo,
              orderStatusState,
              orderStatusPayment,
              priceTotal,
              receiver,
              id,
            } = order;
            const { status: orderState } = orderStatusState;
            const { status: orderPayment } = orderStatusPayment;
            const { createdAt } = order;

            return (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`${RoutePathEnum.ORDER_UPDATE}/${id}`}>
                    {orderNo}
                  </Link>
                </TableCell>
                <TableCell>
                  {receiver?.name} {order.receiver?.lastName}
                </TableCell>
                <TableCell>{orderState}</TableCell>
                <TableCell>{orderPayment}</TableCell>
                <TableCell>{buildDate(createdAt)}</TableCell>
                <TableCell>{priceTotal}</TableCell>
              </TableRow>
            );
          })}
          {/* <TableRow> */}
          {/*   <TableCell> */}
          {/*     <Link href={`${RoutePathEnum.ORDER_UPDATE}/${id}`}> */}
          {/*       {orderNo} */}
          {/*     </Link> */}
          {/*   </TableCell> */}
          {/*   {receiver && ( */}
          {/*     <TableCell> */}
          {/*       {receiver.name} {receiver.lastName} */}
          {/*     </TableCell> */}
          {/*   )} */}
          {/*   <TableCell>{orderState}</TableCell> */}
          {/*   <TableCell>{orderPayment}</TableCell> */}
          {/*   <TableCell>{buildDate(createdAt)}</TableCell> */}
          {/*   <TableCell>{priceTotal}</TableCell> */}
          {/* </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
};
