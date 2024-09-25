"use client";
import { ConsumerFormElements } from "@/entities/consumer";
import {
  ConsumerFormCreate,
  useConsumerCreateMutation,
} from "@/features/consumerCreate";
import { useOrderCreateMutation } from "@/features/orderCreate/_mutation/useCreate.mutation";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState } from "react";

interface OrderCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const OrderCreate: FC<OrderCreateProps> = (props) => {
  const { callbackUrl } = props;

  const [userId, setUserId] = useState("");

  // TODO: Move in hook
  const { consumerCreate, isPending: isConsumerPending } =
    useConsumerCreateMutation();
  const { orderCreate, isSuccess } = useOrderCreateMutation();

  const router = useRouter();

  const handleCreate = async (userId: string) => {
    const order = await orderCreate({ orderData: { userId } });

    if (callbackUrl) {
      router.push(`${RoutePathEnum.ORDER_UPDATE}/${order.id}`);
    }
  };

  // TODO: Add consumer in modal like address

  return (
    <div className="flex w-full flex-col gap-4">
      <ConsumerFormCreate
        onConsumerCreate={consumerCreate}
        isPending={isConsumerPending}
      >
        <ConsumerFormElements.FieldConsumerSelectSearch />
        <Button onClick={() => handleCreate(userId)}>Create Order</Button>
      </ConsumerFormCreate>
    </div>
  );
};
