"use client";
import { useOrderRemoveConfirm } from "@/features/orderRowRemove";
import { useOrderRowUpdateQuantityMutation } from "@/features/orderRowUpdate/_mutation/useOrderRowUpdateQuantity.mutation";
import { UserFormCreate } from "@/features/userCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const OrderCreate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl } = props;

  const { orderRowUpdateQuantity } = useOrderRowUpdateQuantityMutation();
  const { removeOrderConfirm, isPending, isSuccess } = useOrderRemoveConfirm();

  return (
    <div className="flex w-full flex-col gap-4">
      <UserFormCreate
        onUserCreate={(user: any) => {
          console.log("output_log: user =>>>", user);
        }}
        isPending={false}
      />
      {/* <OrderRowAdd orderId={orderId} className="flex w-full border p-4" /> */}
      {/* <OrderRowList */}
      {/*   orderId={orderId} */}
      {/*   orderRowUpdateQuantity={orderRowUpdateQuantity} */}
      {/*   orderRowRemove={removeOrderConfirm} */}
      {/*   className="flex w-full border p-4" */}
      {/* /> */}
    </div>
  );
};
