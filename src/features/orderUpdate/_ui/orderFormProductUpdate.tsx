"use client";
import {
  OrderProductList,
  OrderRow,
  orderFormProductSchema,
} from "@/entities/order";
import { ProductSelect } from "@/entities/product";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderProductSelectList } from "./orderProductList";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  orderProductList: Array<OrderRow>;
  handleSubmit: (data: OrderFormValues) => void;
  orderId: string;
  // callbackUrl?: string;
  className?: string;
  // onSuccess?: () => void;
}

type OrderFormValues = z.infer<typeof orderFormProductSchema>;

export const OrderFormProductUpdate: FC<OrderFormProps> = (props) => {
  const { className, orderProductList, handleSubmit, orderId } = props;

  const form = useForm<OrderFormValues>();

  return (
    <div className={cn(className, "w-full")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* <ProductSelect name={"orderProductToAdd"} control={form.control} /> */}
          <OrderProductSelectList orderId={orderId} control={form.control} />
          <Button type="submit">Add product</Button>
        </form>
      </Form>
      <OrderProductList orderProductRowList={orderProductList} />
    </div>
  );
};
