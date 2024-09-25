"use client";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { useOrderRowCreateHandler } from "../_vm/useOrderRowCreate.handler";
import { useOrderRowCreateToSelectSearch } from "../_vm/useOrderRowCreateToSelectSearch.model";
import { OrderRowCreateForm } from "./tmp/orderRowCreateForm";

interface OrderRowCreateProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  className?: string;
}

export const OrderRowCreate: FC<OrderRowCreateProps> = (props) => {
  const { className, orderId } = props;

  const { productGroup, isPending, toSearch, searchValue } =
    useOrderRowCreateToSelectSearch({ orderId });

  const { handleOrderRowCreate, isSuccessUpdate, isPendingUpdate } =
    useOrderRowCreateHandler({
      data: {
        orderId,
      },
    });

  return (
    <OrderRowCreateForm
      className={cn(className, "w-full")}
      orderProductGroup={productGroup}
      searchValue={searchValue}
      handleSubmit={handleOrderRowCreate}
      toSearch={toSearch}
      isPending={isPending || isPendingUpdate}
    />
  );
};
