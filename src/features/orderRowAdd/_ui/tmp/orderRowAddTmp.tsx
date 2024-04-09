"use client";
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
import { OrderProductGroup } from "../../_domain/types";
import { OrderRowAddValues } from "../../_domain/form.schema";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  orderProductGroup: OrderProductGroup;
  searchValue: string;
  isPending: boolean;
  handleSubmit: (data: OrderRowAddValues) => void;
  toSearch: (q: string) => void;
}

export const OrderRowAddTmp: FC<OrderFormProps> = (props) => {
  const {
    className,
    orderProductGroup,
    searchValue,
    handleSubmit,
    toSearch,
    isPending,
  } = props;

  const form = useForm<OrderRowAddValues>();

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
                    productGroup={orderProductGroup}
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
