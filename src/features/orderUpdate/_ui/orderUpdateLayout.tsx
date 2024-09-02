import { FC, HTMLAttributes } from "react";
import { OrderUpdateForm } from "./form/orderUpdateForm";

interface OrderUpdateLayoutProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const OrderUpdateLayout: FC<OrderUpdateLayoutProps> = (props) => {
  const { orderId } = props;
  return <OrderUpdateForm orderId={orderId} />;
};
