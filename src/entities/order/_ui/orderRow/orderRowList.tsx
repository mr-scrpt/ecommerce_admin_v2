"use client";
import { OrderRow } from "@/kernel/domain/order/orderRow.type";
import { cn } from "@/shared/ui/utils";
import { ComponentType, FC, HTMLAttributes } from "react";
import { useOrderRowListByOrderModel } from "../../_vm/orderRow/useOrderRowListByOrder.model";
import { OrderRowItem } from "./orderRowItem";

export interface OrderRowListProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  SlotFirst?: ComponentType<{ orderRow: OrderRow }>;
  SlotSecond?: ComponentType<{ orderRow: OrderRow }>;
}

export const OrderRowList: FC<OrderRowListProps> = (props) => {
  const { orderId, SlotFirst, SlotSecond, className } = props;
  const { orderRowList } = useOrderRowListByOrderModel(orderId);

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {orderRowList.map((orderRow) => (
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
