import { useOrderWithRelationQuery } from "@/entities/order";
import { SettlementSelectForm } from "@/entities/settlement";
import { FC, HTMLAttributes } from "react";

interface OrderSettlementSelectProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  onSettlementSelect: (settlement: string) => void;
}

export const OrderSettlementSelect: FC<OrderSettlementSelectProps> = (
  props,
) => {
  const { orderId, onSettlementSelect } = props;
  const { order, isSuccess, isPending } = useOrderWithRelationQuery(orderId);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isPending || !isSuccess || !order) {
    return <div>Order not found</div>;
  }

  const { delivery } = order;

  return (
    <SettlementSelectForm
      settlementActive={delivery.settlementRef}
      onSettlementSelect={onSettlementSelect}
    />
  );
};
