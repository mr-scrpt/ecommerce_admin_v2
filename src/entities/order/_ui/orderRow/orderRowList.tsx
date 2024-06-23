"use client";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { OrderRow } from "../..";
import { useOrderWithRelationQuery } from "../../_query/orderWithRelation.query";
import { OrderRowItem } from "./orderRowItem";

interface OrderRowListProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  SlotFirst?: React.ComponentType<{ orderRow: OrderRow }>;
  SlotSecond?: React.ComponentType<{ orderRow: OrderRow }>;
}

export const OrderRowList: FC<OrderRowListProps> = (props) => {
  const { orderId, SlotFirst, SlotSecond, className } = props;
  const { order, isPending, isSuccess } = useOrderWithRelationQuery(orderId);

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {order?.orderRowList.map((orderRow) => (
        <OrderRowItem
          orderRow={orderRow}
          key={orderRow.id}
          slotFirst={SlotFirst && <SlotFirst orderRow={orderRow} />}
          slotSecond={SlotSecond && <SlotSecond orderRow={orderRow} />}
        />
      ))}
    </div>
  );
};
