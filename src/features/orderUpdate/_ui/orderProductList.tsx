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
  const { productList, isPending } = useOrderProductListToSelect(orderId);
  console.log("output_log: productList =>>>", productList);
  return (
    <ProductSelect
      name={"orderProductToAdd"}
      control={control}
      productList={productList}
      isPending={isPending}
    />
  );
};
