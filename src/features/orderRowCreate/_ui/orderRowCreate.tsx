"use client";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { useOrderRowCreateMutation } from "../_mutation/useOrderRowCreate.mutation";
import { useOrderProductListToSelectModel } from "../_vm/useOrderProductList.model";
import { OrderRowCreateForm } from "./tmp/orderRowCreateForm";
import { OrderRowCreateValues } from "../_domain/form.schema";

interface OrderRowCreateProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  className?: string;
}

export const OrderRowCreate: FC<OrderRowCreateProps> = (props) => {
  const { className, orderId } = props;
  const { orderRowAdd, isPending: isPendingUpdate } =
    useOrderRowCreateMutation();

  const handleSubmit = async (data: OrderRowCreateValues) => {
    await orderRowAdd({
      target: {
        orderId,
      },
      orderRowData: {
        productId: data.productId,
        quantity: 1,
      },
    });
  };

  const { productGroup, isPending, toSearch, searchValue } =
    useOrderProductListToSelectModel(orderId);

  return (
    <OrderRowCreateForm
      className={cn(className, "w-full")}
      orderProductGroup={productGroup}
      searchValue={searchValue}
      handleSubmit={handleSubmit}
      toSearch={toSearch}
      isPending={isPending || isPendingUpdate}
    />
  );
};
