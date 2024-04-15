"use client";
import { OrderRowAddValues } from "@/entities/order/server";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { useOrderAddRowMutation } from "../_mutation/useOrderAddRow.mutation";
import { useOrderProductListToSelect } from "../_vm/useOrderProductList";
import { OrderRowAddTmp } from "./tmp/orderRowAddTmp";

interface OrderRowAddProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  className?: string;
}

export const OrderRowAdd: FC<OrderRowAddProps> = (props) => {
  const { className, orderId } = props;
  const { orderRowAdd, isPending: isPendingUpdate } = useOrderAddRowMutation();

  const handleSubmit = async (data: OrderRowAddValues) => {
    await orderRowAdd({
      orderId,
      data: {
        productId: data.productId,
        quantity: 1,
      },
    });
  };

  const { productGroup, isPending, toSearch, searchValue } =
    useOrderProductListToSelect(orderId);

  return (
    <OrderRowAddTmp
      className={cn(className, "w-full")}
      orderProductGroup={productGroup}
      searchValue={searchValue}
      handleSubmit={handleSubmit}
      toSearch={toSearch}
      isPending={isPending || isPendingUpdate}
    />
  );
};
