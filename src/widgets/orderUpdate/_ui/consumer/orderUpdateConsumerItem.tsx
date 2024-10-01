import {
  ConsumerProvideByOrder,
  ConsumerPresentation,
} from "@/entities/consumer";
import {
  OrderListPresentation,
  OrderListProvideByOrder,
} from "@/entities/order";
import { Title } from "@/shared/ui/title";
import { FC, HTMLAttributes } from "react";

interface OrderUpdateConsumerProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderUpdateConsumerItem: FC<OrderUpdateConsumerProps> = (
  props,
) => {
  const { orderId } = props;

  return (
    <div className="flex w-full flex-col gap-8">
      <ConsumerProvideByOrder orderId={orderId}>
        <Title title="Consumer Data" />
        <ConsumerPresentation.Tabel className="flex w-full border p-4" />
      </ConsumerProvideByOrder>

      <OrderListProvideByOrder orderId={orderId}>
        <Title title="Order list by consumer" />
        <OrderListPresentation.Tabel className="flex w-full border p-4" />
      </OrderListProvideByOrder>
    </div>
  );
};
