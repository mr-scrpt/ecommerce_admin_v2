"use client";
import { SettlementSelectElement } from "@/entities/settlement";
import { Store } from "@/kernel/domain/store/store.type";
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
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  StoreFormDefaultValues,
  storeFormDefaultSchema,
} from "../../../_domain/form.schema";
import { StoreSelectElement } from "./storeSelectElement";

interface StoreFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  storeData?: Store;
  handleSubmit: (data: StoreFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

type StoreFormElementsType = FC<StoreFormElementsProps> & {
  // TODO: Select settlement entities
  FieldSettlementSelect: FC;
  FieldStoreSelect: FC;
  FieldName: FC;
  FieldAddress: FC;
  SubmitButton: FC<StoreSubmitFieldProps>;
};

const getDefaultValues = (storeData?: Store) => ({
  name: storeData?.name ?? "",
  settlementRef: storeData?.settlementRef ?? "",
  address: storeData?.address ?? "",
  storeId: storeData?.id ?? "",
});

export const StoreFormElements: StoreFormElementsType = (props) => {
  const { storeData, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<StoreFormDefaultValues>({
    resolver: zodResolver(schema ?? storeFormDefaultSchema),
    defaultValues: getDefaultValues(storeData),
  });

  useEffect(() => {
    form.reset(getDefaultValues(storeData));
  }, [storeData, form]);

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

StoreFormElements.FieldSettlementSelect = function FieldSettlement() {
  const { control, resetField } = useFormContext<StoreFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="settlementRef"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select settlement</FormLabel>
          <SettlementSelectElement
            settlementActive={field.value}
            onSelectSettlement={(v) => {
              resetField("settlementRef");
              field.onChange(v);
            }}
          />
        </FormItem>
      )}
    />
  );
};

StoreFormElements.FieldStoreSelect = function StoreList() {
  const { control, getValues } = useFormContext<StoreFormDefaultValues>();
  const { settlementRef } = getValues();

  // TODO: Fields name change "id", "settlement"?
  return (
    <FormField
      control={control}
      name="storeId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Store list</FormLabel>
          <StoreSelectElement
            onSelectStore={field.onChange}
            settlementRef={settlementRef}
            storeInit={field.value}
          />
        </FormItem>
      )}
    />
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
          <FormLabel>Store Name</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
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
          <FormLabel>Address line</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface StoreSubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

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
