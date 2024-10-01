import { ConsumerFormElements } from "@/entities/consumer";
import { ConsumerFormCreate } from "@/features/consumerCreate";
import { FC, HTMLAttributes } from "react";

interface OrderCreateConsumerItemProps extends HTMLAttributes<HTMLDivElement> {
  // orderId: string;
}

export const OrderCreateConsumerItem: FC<OrderCreateConsumerItemProps> = (
  props,
) => {
  // const { orderId } = props;
  // // const { receiverList } = useReceiverListByOrder(orderId);
  // const { consumer } = useConsumerByOrderModel(orderId);
  //
  // if (!consumer) return null;
  // const { id: userId } = consumer;

  return (
    <>
      <ConsumerFormCreate />
      {/* <ConsumerFormElements> */}
      {/*   <ConsumerFormElements.FieldConsumerSelectSearch /> */}
      {/* </ConsumerFormElements> */}
    </>
  );
};
