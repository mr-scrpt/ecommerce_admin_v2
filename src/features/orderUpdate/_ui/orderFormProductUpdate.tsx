"use client";
import { OrderRow, orderFormProductSchema } from "@/entities/order";
import { ProductSelect } from "@/entities/product";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOrderProductListToSelect } from "../_vm/useOrderProductList";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  handleSubmit: (data: OrderFormValues) => void;
  orderId: string;
  className?: string;
}

type OrderFormValues = z.infer<typeof orderFormProductSchema>;

export const OrderFormProductUpdate: FC<OrderFormProps> = (props) => {
  const { className, handleSubmit, orderId } = props;

  const form = useForm<OrderFormValues>();
  const { productList, isPending, toSearch, searchValue } =
    useOrderProductListToSelect(orderId);

  return (
    <div className={cn(className, "w-full")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name={"orderProductToAdd"}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Product list</FormLabel>
                  <ProductSelect
                    name={"orderProductToAdd"}
                    control={form.control}
                    productList={productList}
                    toSearch={toSearch}
                    searchValue={searchValue}
                    isPending={isPending}
                    field={field}
                  />
                  <FormDescription>Select product to add</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Add product</Button>
        </form>
      </Form>
    </div>
  );
};
