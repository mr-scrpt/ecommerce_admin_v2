"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  StoreFormDefaultValues,
  storeFormDefaultSchema,
} from "../_domain/form.schema";
import { Store } from "../_domain/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import {
  SettleToSelect,
  SettlementSelect,
} from "@/shared/ui/select/settleSelect";
import { Input } from "@/shared/ui/input";

interface StoreFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  store: Store;
  handleSubmit: (data: StoreFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

type StoreFormElementsType = FC<StoreFormElementsProps> & {
  FieldSettlement: FC<{
    settlementListToSelect: SettleToSelect[];
    toSearch: (q: string) => void;
    handleSelect?: (value: string) => void;
  }>;
  FieldAddress: FC<{}>;
};

const getDefaultValues = (store: Store) => ({
  settlement: store.settlement ?? "",
  address: store.address ?? "",
});

export const StoreFormElements: StoreFormElementsType = (props) => {
  const { store, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<StoreFormDefaultValues>({
    resolver: zodResolver(schema ?? storeFormDefaultSchema),
    defaultValues: getDefaultValues(store),
  });

  useEffect(() => {
    form.reset(getDefaultValues(store));
  }, [store, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
      </form>
    </FormProvider>
  );
};

StoreFormElements.FieldSettlement = function FieldSettlement(props) {
  const { settlementListToSelect, toSearch, handleSelect } = props;
  const { control } = useFormContext<StoreFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="settlement"
      render={({ field }) => (
        <SettlementSelect
          control={control}
          className="w-full"
          name="settlement"
          citiesList={settlementListToSelect}
          isPending={false}
          toSearch={toSearch}
          handleSelect={handleSelect}
          field={field}
        />
      )}
    />
  );
};

StoreFormElements.FieldAddress = function FieldAddress() {
  const { control } = useFormContext<StoreFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Street</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
