"use client";
import { useConsumerCreateModal } from "@/features/consumerCreate";
import { OrderCreateForm } from "@/features/orderCreate";
import { ConsumerCreateModalProvider } from "@/kernel/domain/consumer/consumer.provider";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface OrderCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const OrderCreate: FC<OrderCreateProps> = (props) => {
  const { callbackUrl } = props;
  const { openConsumerCreateModal } = useConsumerCreateModal();
  return (
    <ConsumerCreateModalProvider consumerCreateModal={openConsumerCreateModal}>
      <OrderCreateForm callbackUrl={callbackUrl} />
    </ConsumerCreateModalProvider>
  );
};

// const [userId, setUserId] = useState("");
//
// // TODO: Move in hook
// const { consumerCreate, isPending: isConsumerPending } =
//   useConsumerCreateMutation();
// const { orderCreate, isSuccess } = useOrderCreateMutation();
//
// const router = useRouter();
//
// const handleCreate = async (userId: string) => {
//   const order = await orderCreate({ orderData: { userId } });
//
//   if (callbackUrl) {
//     router.push(`${RoutePathEnum.ORDER_UPDATE}/${order.id}`);
//   }
// };
//
// // TODO: Add consumer in modal like address
//
// return (
//   <div className="flex w-full flex-col gap-4">
//     <ConsumerFormCreate
//       onConsumerCreate={consumerCreate}
//       isPending={isConsumerPending}
//     >
//       <ConsumerFormElements.FieldConsumerSelectSearch />
//       <Button onClick={() => handleCreate(userId)}>Create Order</Button>
//     </ConsumerFormCreate>
//   </div>
// );
