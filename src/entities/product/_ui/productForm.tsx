"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ProductFormValues,
  productFormSchema,
} from "../_domain/product.schema";
import { Product } from "../_domain/types";
import { BoardField } from "./boardField";

interface ProductFormProps extends HTMLAttributes<HTMLFormElement> {
  product?: Product;
  handleSubmit?: (data: ProductFormValues) => void;
  isPending: boolean;
  submitText?: string;
}

const getDefaultValues = (product?: Product) => ({
  name: product?.name ?? "",
  board: product?.board ?? [],
});

export const ProductForm: FC<ProductFormProps> = (props) => {
  const { product, handleSubmit: onSubmit, submitText, isPending } = props;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(product),
  });

  useEffect(() => {
    form.reset(getDefaultValues(product));
  }, [product, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  const handleDeleteBoard = (path: string) => {
    const list = form.getValues("board");
    const result = list.filter((item) => item !== path);
    form.setValue("board", result);
  };

  const isPendingAppearance = useAppearanceDelay(isPending);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <BoardField
                  value={field.value}
                  onChange={field.onChange}
                  onDelete={handleDeleteBoard}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPendingAppearance}>
          {isPendingAppearance && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Profile updating..."
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
