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
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CategoryFormValues,
  categoryFormSchema,
} from "../_domain/category.schema";
import { Category } from "../_domain/types";
import { BoardField } from "./boardField";
import { MultiSelect, OptionItem } from "@/shared/ui/multiSelect";

interface CategoryFormProps extends HTMLAttributes<HTMLFormElement> {
  category?: Category;
  handleSubmit?: (data: CategoryFormValues) => void;
  isPending: boolean;
  submitText?: string;
  optionSelectOptionList: Array<OptionItem>;
  optionSelectOptionListActive?: Array<OptionItem>;
  handleOptionSelectOption: (
    itemList: Array<OptionItem>,
  ) => Array<{ id: string }>;
}

const getDefaultValues = (category?: Category) => ({
  name: category?.name ?? "",
  board: category?.board ?? [],
});

export const CategoryForm: FC<CategoryFormProps> = (props) => {
  const {
    category,
    handleSubmit: onSubmit,
    submitText,
    isPending,
    optionSelectOptionList,
    optionSelectOptionListActive,
    handleOptionSelectOption,
  } = props;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: getDefaultValues(category),
  });

  useEffect(() => {
    form.reset(getDefaultValues(category));
  }, [category, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  const handleDeleteBoard = (path: string) => {
    const list = form.getValues("board");
    const result = list.filter((item) => item !== path);
    form.setValue("board", result);
  };

  const isPendingAppearance = useAppearanceDelay(isPending);

  const handleSelect = useCallback((value: OptionItem[]) => {
    form.setValue("optionList", handleOptionSelectOption(value));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="optionList"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Category list</FormLabel>
                <FormControl>
                  <MultiSelect
                    optionList={optionSelectOptionList}
                    optionActiveList={optionSelectOptionListActive}
                    onSelected={handleSelect}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name..." {...field} />
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
