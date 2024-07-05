"use client";
import { cn } from "@/shared/ui/utils";
import { ComponentType, FC, HTMLAttributes } from "react";
import { useOrderWithRelationQuery } from "../../_query/orderWithRelation.query";
import { OrderRowItem } from "./orderRowItem";
import { OrderRow } from "@/kernel/domain/order/orderRow.type";

interface OrderRowListProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  SlotFirst?: ComponentType<{ orderRow: OrderRow }>;
  SlotSecond?: ComponentType<{ orderRow: OrderRow }>;
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
