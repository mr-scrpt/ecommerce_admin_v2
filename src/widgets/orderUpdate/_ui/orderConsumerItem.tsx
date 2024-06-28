import { ConsumerData } from "@/entities/consumer";
import { FC, HTMLAttributes } from "react";

interface OrderConsumerProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderConsumerItem: FC<OrderConsumerProps> = (props) => {
  const { orderId } = props;
  return (
    <ConsumerData orderId={orderId}>
      <ConsumerData.ConsumerData className="flex w-full border p-4" />
      <ConsumerData.OrderData className="flex w-full border p-4" />
    </ConsumerData>
  );
};
