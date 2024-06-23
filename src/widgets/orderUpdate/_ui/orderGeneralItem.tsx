import { OrderRowList } from "@/entities/order";
import { OrderRowCreate } from "@/features/orderRowCreate";
import { OrderRemoveButton } from "@/features/orderRowRemove";
import { OrderRowCounter } from "@/features/orderRowUpdate";
import { OrderStatusUpdate } from "@/features/orderUpdate";
import { FC, HTMLAttributes } from "react";

interface OrderGeneralItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderGeneralItem: FC<OrderGeneralItemProps> = (props) => {
  const { orderId } = props;
  return (
    <>
      <OrderStatusUpdate orderId={orderId} className="flex w-full border p-4" />
      <OrderRowCreate orderId={orderId} className="flex w-full border p-4" />
      <OrderRowList
        orderId={orderId}
        SlotFirst={OrderRowCounter}
        SlotSecond={OrderRemoveButton}
      />
    </>
  );
};
