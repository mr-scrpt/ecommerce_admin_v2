"use client";
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
import {
  DefaultValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  StoreFormDefaultValues,
  storeDefaultFieldsValues,
  storeFormDefaultSchema,
} from "../../_domain/form.schema";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { StoreNameElement } from "./elements/storeNameElement";
import { StoreAddressElement } from "./elements/storeAddressElement";
import { StoreSelectElement } from "./elements/storeSelectElement";

// interface StoreFormElementsProps extends HTMLAttributes<HTMLFormElement> {
//   storeData?: Store;
//   handleSubmit: (data: StoreFormDefaultValues) => void;
//   schema?: ZodTypeAny;
// }
//
// type StoreFormElementsType = FC<StoreFormElementsProps> & {
//   // TODO: Select settlement entities
//   FieldSettlementSelect: FC;
//   FieldStoreSelect: FC;
//   FieldName: FC;
//   FieldAddress: FC;
//   SubmitButton: FC<StoreSubmitFieldProps>;
// };
//
// const getDefaultValues = (storeData?: Store) => ({
//   name: storeData?.name ?? "",
//   settlementRef: storeData?.settlementRef ?? "",
//   address: storeData?.address ?? "",
//   storeId: storeData?.id ?? "",
// });
//
interface StoreFormElementsProps<T extends StoreFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type StoreFormElementsComponent = <
  T extends StoreFormDefaultValues = StoreFormDefaultValues,
>(
  props: StoreFormElementsProps<T>,
) => React.ReactElement;

type StoreFormFields = {
  FieldName: FC;
  FieldAddressLine: FC;
  FieldStoreSelect: FC<StoreFormSelectProps>;
  SubmitButton: ButtonSubmitComponentType;
};

type StoreFormElementsType = StoreFormElementsComponent & StoreFormFields;

const getDefaultFormValues = <T extends StoreFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...storeDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const StoreFormElements: StoreFormElementsType = <
  T extends StoreFormDefaultValues,
>(
  props: StoreFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? storeFormDefaultSchema),
    defaultValues: { ...getDefaultFormValues<T>(defaultValues) },
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });

  // console.log("output_log: Error =>>>", form.formState.errors);
  // console.log("output_log: VALUES =>>>", form.getValues());
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
          <FormLabel>Store name</FormLabel>
          <StoreNameElement
            onChange={field.onChange}
            defaultValue={field.value}
          />
        </FormItem>
      )}
    />
  );
};

StoreFormElements.FieldAddressLine = function FieldAddressLine() {
  const { control } = useFormContext<StoreFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="addressLine"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address line</FormLabel>
          <Input
            className="w-full"
            onChange={field.onChange}
            defaultValue={field.value}
          />
        </FormItem>
      )}
    />
  );
};
// StoreFormElements.FieldAddress = function FieldAddress() {
//   const { control } = useFormContext<StoreFormDefaultValues>();
//   return (
//     <FormField
//       control={control}
//       name="address"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Store name</FormLabel>
//           <StoreAddressElement
//             onChange={field.onChange}
//             defaultValue={field.value}
//           />
//         </FormItem>
//       )}
//     />
//   );
// };
//
interface StoreFormSelectProps {
  settlementRef: string;
}

StoreFormElements.FieldStoreSelect = function FieldStoreSelect(
  props: StoreFormSelectProps,
) {
  const { control, getFieldState } = useFormContext<StoreFormDefaultValues>();
  const { settlementRef } = props;

  if (!getFieldState("storeList")) return null;

  return (
    <FormField
      control={control}
      name="storeList"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Store select</FormLabel>

            <StoreSelectElement
              storeActive={field.value?.[0]}
              onSelectStore={field.onChange}
              settlementRef={settlementRef}
            />
          </FormItem>
        );
      }}
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
