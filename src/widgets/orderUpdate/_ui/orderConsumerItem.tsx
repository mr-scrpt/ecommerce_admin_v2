import { ConsumerData } from "@/features/consumerData";
import { FC, HTMLAttributes } from "react";

interface OrderConsumerProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderConsumerItem: FC<OrderConsumerProps> = (props) => {
  const { orderId } = props;
  return (
    <ConsumerData orderId={orderId}>
      <ConsumerData.OwnerInfo className="flex w-full border p-4" />
      <ConsumerData.OrderInfo className="flex w-full border p-4" />
    </ConsumerData>
  );
};
