"use client";
import { usePropertyItemListToSelectModel } from "@/entities/property";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FC, HTMLAttributes, useEffect } from "react";
import {
  DefaultValues,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  PropertyItemFormDefaultValues,
  propertyItemDefaultFieldsValues,
  propertyItemFormSchema,
} from "../../../_domain/propertyItem/form.schema";
import { PropertyItemCheckboxElement } from "./elements/propertyItemCheckboxElement";
import { PropertyItemMultiSelectElement } from "./elements/propertyItemMultiSelectElement";
import { PropertyItemNameElement } from "./elements/propertyItemNameElement";
import { PropertyItemRadioElement } from "./elements/propertyItemRadioElement";
import { PropertyItemSelectElement } from "./elements/propertyItemSelectElement";
import { PropertyItemValueElement } from "./elements/propertyItemValueElement";
import { PropertyItemListElement } from "./elements/propertyItemListElement";

interface PropertyItemFormElementsProps<T extends PropertyItemFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type PropertyItemFormElementsComponent = <
  T extends PropertyItemFormDefaultValues = PropertyItemFormDefaultValues,
>(
  props: PropertyItemFormElementsProps<T>,
) => React.ReactElement;

interface PropertyItemElementProps {
  propertyId: string;
}

type PropertyItemFormFields = {
  FieldPropertyItemList: FC;
  FieldPropertyItemSelect: FC<PropertyItemElementProps>;
  FieldPropertyItemMultiSelect: FC<PropertyItemElementProps>;
  FieldPropertyItemRadio: FC<PropertyItemElementProps>;
  FieldPropertyItemCheckbox: FC<PropertyItemElementProps>;

  SubmitButton: ButtonSubmitComponentType;
};

type PropertyFormElementsType = PropertyItemFormElementsComponent &
  PropertyItemFormFields;

const getDefaultFormValues = <T extends PropertyItemFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...propertyItemDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const PropertyItemFormElements: PropertyFormElementsType = <
  T extends PropertyItemFormDefaultValues,
>(
  props: PropertyItemFormElementsProps<T>,
) => {
  const { handleSubmit: onSubmit, schema, defaultValues, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? propertyItemFormSchema),
    defaultValues: { ...getDefaultFormValues<T>(defaultValues) },
  });

  useEffect(() => {
    form.reset(getDefaultFormValues<T>(defaultValues));
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data: T) => {
    onSubmit?.(data);
  });

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

PropertyItemFormElements.FieldPropertyItemList =
  function FieldPropertyItemList() {
    return <PropertyItemListElement />;
  };

PropertyItemFormElements.FieldPropertyItemSelect =
  function FieldPropertyItemSelect(props: PropertyItemElementProps) {
    const { propertyId } = props;
    const { control, getFieldState } =
      useFormContext<PropertyItemFormDefaultValues>();

    if (!getFieldState("propertyItemList")) return null;

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>PropertyItem</FormLabel>
              <PropertyItemSelectElement
                propertyItemListActive={field.value}
                onSelectPropertyItem={field.onChange}
                propertyId={propertyId}
              />
              {/* <FormMessage /> */}
            </FormItem>
          );
        }}
      />
    );
  };

PropertyItemFormElements.FieldPropertyItemMultiSelect =
  function FieldPropertyItemMultiSelect(props: PropertyItemElementProps) {
    const { propertyId } = props;
    const { control, getFieldState } =
      useFormContext<PropertyItemFormDefaultValues>();

    if (!getFieldState("propertyItemList")) return null;

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PropertyItem</FormLabel>
            <PropertyItemMultiSelectElement
              propertyItemListActive={field.value}
              onSelectPropertyItem={field.onChange}
              propertyId={propertyId}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

PropertyItemFormElements.FieldPropertyItemRadio =
  function FieldPropertyItemRadio(props: PropertyItemElementProps) {
    const { propertyId } = props;
    const { control, getFieldState } =
      useFormContext<PropertyItemFormDefaultValues>();

    if (!getFieldState("propertyItemList")) return null;

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PropertyItem</FormLabel>
            <PropertyItemRadioElement
              propertyItemListActive={field.value}
              onSelectPropertyItem={field.onChange}
              propertyId={propertyId}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

PropertyItemFormElements.FieldPropertyItemCheckbox =
  function FieldPropertyItemCheckbox(props: PropertyItemElementProps) {
    const { propertyId } = props;
    const { control, getFieldState } =
      useFormContext<PropertyItemFormDefaultValues>();

    const { propertySelectOptionList, isPending, isSuccess } =
      usePropertyItemListToSelectModel(propertyId);

    if (!getFieldState("propertyItemList")) return null;

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PropertyItem</FormLabel>
            <PropertyItemCheckboxElement
              propertyItemListActive={field.value}
              onSelectPropertyItem={field.onChange}
              propertyId={propertyId}
            />
          </FormItem>
        )}
      />
    );
  };

PropertyItemFormElements.SubmitButton = function SubmitButton({
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
