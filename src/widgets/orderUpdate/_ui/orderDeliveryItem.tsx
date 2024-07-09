import { DeliveryFormUpdate } from "@/features/deliveryUpdate";
import { OrderSettlementSelect } from "@/features/orderUpdate";
import { OrderDeliveryUpdate } from "@/features/orderUpdate/_ui/orderDeliveryUpdate";
import { FC, HTMLAttributes, useState } from "react";

interface OrderDeliveryItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderDeliveryItem: FC<OrderDeliveryItemProps> = (props) => {
  const { orderId } = props;
  const [settlementRef, setSettlementRef] = useState<string>("");
  console.log("output_log: settlementRef =>>>", settlementRef);
  return (
    <>
      {/* <OrderSettlementSelect */}
      {/*   orderId={orderId} */}
      {/*   onSettlementSelect={setSettlementRef} */}
      {/* /> */}
      {/* TODO: Move to OrderDeliveryUpdate*/}
      {/* <OrderDeliveryUpdate orderId={orderId} settlementRef={settlementRef} /> */}
      <OrderDeliveryUpdate orderId={orderId} />
    </>
  );
};
