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
import { MultiSelect, MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { StoreRelation } from "../_domain/types";
import { BoardField } from "./boardField";
import { StoreFormValues, storeFormSchema } from "../_domain/form.schema";

interface StoreFormProps extends HTMLAttributes<HTMLFormElement> {
  store?: StoreRelation;
  handleSubmit?: (data: StoreFormValues) => void;
  isPending: boolean;
  submitText?: string;
  optionSelectOptionList: Array<MultiSelectOptionItem>;
  optionSelectOptionListActive?: Array<MultiSelectOptionItem>;
  handleOptionSelectOption: (
    itemList: Array<MultiSelectOptionItem>,
  ) => Array<{ id: string }>;
}

const getDefaultValues = (store?: StoreRelation) => ({
  name: store?.name ?? "",
  board: store?.board ?? [],
  propertyList: store?.propertyList ?? [],
});

export const StoreForm: FC<StoreFormProps> = (props) => {
  const {
    store,
    handleSubmit: onSubmit,
    submitText,
    isPending,
    optionSelectOptionList,
    optionSelectOptionListActive,
    handleOptionSelectOption,
  } = props;

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: getDefaultValues(store),
  });

  useEffect(() => {
    form.reset(getDefaultValues(store));
  }, [store, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  const handleDeleteBoard = (path: string) => {
    const list = form.getValues("board");
    const result = list.filter((item) => item !== path);
    form.setValue("board", result);
  };

  const isPendingAppearance = useAppearanceDelay(isPending);

  const handleSelect = useCallback((value: MultiSelectOptionItem[]) => {
    form.setValue("propertyList", handleOptionSelectOption(value));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="propertyList"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Options list</FormLabel>
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
                <Input placeholder="Enter store name..." {...field} />
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
