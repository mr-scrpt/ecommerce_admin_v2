"use client";
import { useOrderRemoveConfirm } from "@/features/orderRowRemove";
import { useOrderRowUpdateQuantityMutation } from "@/features/orderRowUpdate/_mutation/useOrderRowUpdateQuantity.mutation";
import { OrderSelectOwner } from "@/features/orderSelectOwner";
import { UserFormCreate } from "@/features/userCreate";
import { useUserCreateMutation } from "@/features/userCreate/_mutation/useUserCreate.mutation";
import { UserCreate } from "@/features/userCreate/domain/types";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const OrderCreate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl } = props;

  const { orderRowUpdateQuantity } = useOrderRowUpdateQuantityMutation();
  const { removeOrderConfirm, isPending, isSuccess } = useOrderRemoveConfirm();
  const { createUser } = useUserCreateMutation();

  return (
    <div className="flex w-full flex-col gap-4">
      <UserFormCreate
        onUserCreate={(user: UserCreate) => {
          createUser({ data: user });
        }}
        isPending={false}
      />
      <OrderSelectOwner onSelectOwner={console.log} />
      {/* <OrderRowAdd orderId={orderId} className="" /> */}
      {/* <OrderRowList */}
      {/*   orderId={orderId} */}
      {/*   orderRowUpdateQuantity={orderRowUpdateQuantity} */}
      {/*   orderRowRemove={removeOrderConfirm} */}
      {/*   className="flex w-full border p-4" */}
      {/* /> */}
    </div>
  );
};
