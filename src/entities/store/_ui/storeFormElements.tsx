"use client";
import { Button } from "@/shared/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import {
  SettleToSelect,
  SettlementSelect,
} from "@/shared/ui/select/settlementSelect";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  StoreFormDefaultValues,
  storeFormDefaultSchema,
} from "../_domain/form.schema";
import { Store } from "@/kernel/domain/store/store.type";

interface StoreFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  store: Store;
  handleSubmit: (data: StoreFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

type StoreFormElementsType = FC<StoreFormElementsProps> & {
  FieldName: FC<{}>;
  FieldSettlement: FC<{
    settlementListToSelect: SettleToSelect[];
    toSearch: (q: string) => void;
    handleSelect?: (value: string) => void;
  }>;
  FieldAddress: FC<{}>;
  SubmitButton: FC<{
    isPending: boolean;
    submitText: string;
    className?: string;
  }>;
};

const getDefaultValues = (store: Store) => ({
  name: store.name ?? "",
  settlement: store.settlementRef ?? "",
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

StoreFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<StoreFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Settlement Name</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
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

StoreFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button type="submit" disabled={isPending} className={cn(className)}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Profile updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
