import { FC, HTMLAttributes } from "react";
import { useOrderProductListToSelect } from "../_vm/useOrderProductList";
import { ProductSelect } from "@/entities/product";
import { UseFormReturn } from "react-hook-form";

interface OrderProductListProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  control: UseFormReturn<any>["control"];
}

export const OrderProductSelectList: FC<OrderProductListProps> = (props) => {
  const { orderId, control } = props;
  const { productList, isPending, toSearch, searchValue } =
    useOrderProductListToSelect(orderId);
  return (
    <ProductSelect
      name={"orderProductToAdd"}
      control={control}
      productList={productList}
      toSearch={toSearch}
      isPending={isPending}
    />
  );
};
