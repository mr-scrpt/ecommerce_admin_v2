"use client";
import {
  OrderProductList,
  OrderRow,
  orderFormProductSchema,
} from "@/entities/order";
import { ProductSelect } from "@/entities/product";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOrderUpdateMutation } from "../_mutation/___useOrderUpdate.mutation";
import { Form, FormField } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  orderProductList: Array<OrderRow>;
  handleSubmit: (data: OrderFormValues) => void;
  // callbackUrl?: string;
  className?: string;
  // onSuccess?: () => void;
}

type OrderFormValues = z.infer<typeof orderFormProductSchema>;

export const OrderFormProductUpdate: FC<OrderFormProps> = (props) => {
  const { className, orderProductList, handleSubmit } = props;

  const form = useForm<OrderFormValues>();

  return (
    <div className={cn(className, "w-full")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <ProductSelect name={"orderProductToAdd"} control={form.control} />
          <Button type="submit">Add product</Button>
        </form>
      </Form>
      <OrderProductList orderProductRowList={orderProductList} />
    </div>
  );
};
