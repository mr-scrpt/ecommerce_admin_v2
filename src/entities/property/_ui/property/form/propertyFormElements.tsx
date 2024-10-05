"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
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
  PropertyFormDefaultValues,
  propertyDefaultFieldsValues,
  propertyFormDefaultSchema,
} from "../../../_domain/property/form.schema";
import { PropertyDataTypeSelectElement } from "./elements/propertySelectDataTypeElement";
import { PropertyMultiSelectElement } from "./elements/propertyMultiSelectElement";
import { PropertySelectElement } from "./elements/propertySelectElement";

interface PropertyFormElementsProps<T extends PropertyFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type PropertyFormElementsComponent = <
  T extends PropertyFormDefaultValues = PropertyFormDefaultValues,
>(
  props: PropertyFormElementsProps<T>,
) => React.ReactElement;

type PropertyFormFields = {
  FieldName: FC;
  FieldDataType: FC;
  FieldPropertySelect: FC;
  FieldPropertyMultiSelect: FC;

  SubmitButton: ButtonSubmitComponentType;
};

type PropertyFormElementsType = PropertyFormElementsComponent &
  PropertyFormFields;

const getDefaultFormValues = <T extends PropertyFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...propertyDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const PropertyFormElements: PropertyFormElementsType = <
  T extends PropertyFormDefaultValues,
>(
  props: PropertyFormElementsProps<T>,
) => {
  const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? propertyFormDefaultSchema),
    defaultValues: { ...getDefaultFormValues<T>(defaultValues) },
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });
  console.log("output_log: VALUES =>>>", form.getValues());

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className={"space-y-8"}>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

PropertyFormElements.FieldName = function FieldName() {
  const form = useFormContext<PropertyFormDefaultValues>();

  return (
    <div className="flex w-full flex-col gap-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property name</FormLabel>
            {/* TODO: Create external filed component */}
            <FormControl>
              <Input placeholder="Enter property name..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

PropertyFormElements.FieldDataType = function FieldDataType() {
  const { control } = useFormContext<PropertyFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="datatypeList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Data type</FormLabel>
          <PropertyDataTypeSelectElement
            datatypeActive={field.value[0]}
            onSelectDatatype={field.onChange}
          />
          <FormDescription>Select data type to this property</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

PropertyFormElements.FieldPropertySelect = function FieldList() {
  const { control, getFieldState } =
    useFormContext<PropertyFormDefaultValues>();

  if (!getFieldState("propertyList")) return null;

  return (
    <FormField
      control={control}
      name="propertyList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property list</FormLabel>
          <PropertySelectElement
            propertyListActive={field.value![0]}
            onSelectProperty={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

PropertyFormElements.FieldPropertyMultiSelect = function FieldList() {
  const { control } = useFormContext<PropertyFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="propertyList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property multi select</FormLabel>
          <PropertyMultiSelectElement
            propertyListActive={field.value}
            onSelectProperty={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

PropertyFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
}: {
  isPending: boolean;
  submitText: string;
}) {
  return (
    <Button type="submit" disabled={isPending}>
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
