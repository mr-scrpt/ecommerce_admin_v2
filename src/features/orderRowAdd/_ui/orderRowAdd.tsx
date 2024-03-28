"use client";
import { OrderRowAddValues, orderFormProductSchema } from "@/entities/order";
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
import { useOrderAddRowMutation } from "../_mutation/useOrderAddRow.mutation";
import { useOrderProductListToSelect } from "../_vm/useOrderProductList";
import { orderRowAddSchema } from "@/entities/order/server";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  className?: string;
}

type OrderFormValues = z.infer<typeof orderRowAddSchema>;

export const OrderRowAdd: FC<OrderFormProps> = (props) => {
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

    // onSuccess?.();
  };

  const form = useForm<OrderFormValues>();
  const { productGroup, isPending, toSearch, searchValue } =
    useOrderProductListToSelect(orderId);

  return (
    <div className={cn(className, "w-full")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name={"productId"}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Product list</FormLabel>
                  <ProductSelect
                    name={"orderProductToAdd"}
                    control={form.control}
                    productGroup={productGroup}
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
