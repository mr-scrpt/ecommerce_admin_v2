"use client";
import { ProductSelect, ProductToSelectGroup } from "@/entities/product";
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
import { OrderRowCreateValues } from "../../_domain/form.schema";

interface OrderRowCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  orderProductGroup: ProductToSelectGroup;
  searchValue: string;
  isPending: boolean;
  handleSubmit: (data: OrderRowCreateValues) => void;
  toSearch: (q: string) => void;
}

export const OrderRowCreateForm: FC<OrderRowCreateFormProps> = (props) => {
  const {
    className,
    orderProductGroup,
    searchValue,
    handleSubmit,
    toSearch,
    isPending,
  } = props;

  const form = useForm<OrderRowCreateValues>();

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
