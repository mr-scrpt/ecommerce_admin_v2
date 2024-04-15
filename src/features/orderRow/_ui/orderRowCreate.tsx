"use client";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { OrderProductCreate } from "../_domain/types";
import { useNewOrderProductListToSelect } from "../_vm/useNewOrderProductList";
import { OrderRowAddTmp } from "./tmp/orderRowAddTmp";
import { OrderRowAddValues } from "@/entities/order/server";

interface OrderRowCreateProps extends HTMLAttributes<HTMLDivElement> {
  handleRowCreate: (product: OrderProductCreate) => void;
  productIdList: Array<string>;
}

export const OrderRowCreate: FC<OrderRowCreateProps> = (props) => {
  const { className, productIdList, handleRowCreate } = props;

  const handleSubmit = async (data: OrderRowAddValues) => {
    handleRowCreate({
      productId: data.productId,
      quantity: 1,
    });
  };

  const { productGroup, isPending, toSearch, searchValue } =
    useNewOrderProductListToSelect(productIdList);

  return (
    <OrderRowAddTmp
      className={cn(className, "w-full")}
      orderProductGroup={productGroup}
      searchValue={searchValue}
      handleSubmit={handleSubmit}
      toSearch={toSearch}
      isPending={isPending}
    />
  );
};
