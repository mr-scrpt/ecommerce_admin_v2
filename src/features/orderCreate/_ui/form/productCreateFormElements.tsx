"use client";
import { ButtonSubmitComponentType } from "@/shared/type/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
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
  ProductCreateFormValues,
  productCreateFieldsValues,
  productCreateFormSchema,
} from "../../_domain/form.schema";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { ProductCreatePropertySectionElement } from "./elements/productCreatePropertySectionElement";

interface ProductCreateFormElementsProps<T extends ProductCreateFormValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type ProductCreateFormElementsComponent = <
  T extends ProductCreateFormValues = ProductCreateFormValues,
>(
  props: ProductCreateFormElementsProps<T>,
) => React.ReactElement;

type ProductCreateFormFields = {
  FieldProductPropertySection: FC;
  // FieldProductSelectGroupSearch: FC<ProductSelectGroupSearchElementProps>;
  SubmitButton: ButtonSubmitComponentType;
};

type ProductCreateFormElementsType = ProductCreateFormElementsComponent &
  ProductCreateFormFields;

const getDefaultFormValues = <T extends ProductCreateFormValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...productCreateFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const ProductCreateFormElements: ProductCreateFormElementsType = <
  T extends ProductCreateFormValues,
>(
  props: ProductCreateFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? productCreateFormSchema),
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
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
        <FormMessage />
      </form>
    </FormProvider>
  );
};

ProductCreateFormElements.FieldProductPropertySection =
  function FieldProductPropertySection() {
    const { control, watch } = useFormContext<ProductCreateFormValues>();

    const categoryList = watch("categoryList");

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property product</FormLabel>
            <ProductCreatePropertySectionElement
              propertyItemListActive={field.value}
              onSelectPropertyItem={field.onChange}
              categoryList={categoryList}
            />
          </FormItem>
        )}
      />
    );
  };

ProductCreateFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={className}
      aria-disabled={isPending}
    >
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
