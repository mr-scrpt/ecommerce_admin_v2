"use client";
import { useOrderCreateMutation } from "@/features/orderCreate/_mutation/useCreate.mutation";
import { OrderSelectOwner } from "@/features/orderSelectOwner";
import { UserFormCreate, useUserCreateMutation } from "@/features/userCreate";
import { UserCreate } from "@/features/userCreate/_domain/types";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState } from "react";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const OrderCreate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl } = props;
  const [userId, setUserId] = useState("");

  const { createUser } = useUserCreateMutation();
  const { orderCreate, isSuccess } = useOrderCreateMutation();

  const router = useRouter();
  const handleCreate = async (userId: string) => {
    const { order } = await orderCreate({ userId });

    if (callbackUrl) {
      router.push(`${RoutePathEnum.ORDER_UPDATE}/${order.id}`);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <UserFormCreate
        onUserCreate={(user: UserCreate) => {
          createUser({ data: user });
        }}
        isPending={false}
      />
      <OrderSelectOwner onSelectOwner={setUserId} />
      <Button onClick={() => handleCreate(userId)}>Create Order</Button>
    </div>
  );
};
