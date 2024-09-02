import { FC, HTMLAttributes } from "react";
import { OrderRowFormCreate } from "@/features/orderRowCreate";
import { OrderRowListWithActions } from "./orderRowListWithActions";
import { OrderUpdateLayout } from "@/features/orderUpdate";

interface OrderUpdateProductItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderUpdateProductItem: FC<OrderUpdateProductItemProps> = (
  props,
) => {
  const { orderId } = props;
  return (
    <>
      <OrderUpdateLayout orderId={orderId} />
      <OrderRowFormCreate orderId={orderId} />
      <OrderRowListWithActions orderId={orderId} />
    </>
  );
};
