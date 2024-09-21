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
  ProductUpdateFormValues,
  productUpdateFieldsValues,
  productUpdateFormSchema,
} from "../../_domain/form.schema";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { ProductPropertySectionElement } from "./elements/productUpdatePropertySectionElement";

interface ProductUpdateFormElementsProps<T extends ProductUpdateFormValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type ProductUpdateFormElementsComponent = <
  T extends ProductUpdateFormValues = ProductUpdateFormValues,
>(
  props: ProductUpdateFormElementsProps<T>,
) => React.ReactElement;

type ProductUpdateFormFields = {
  FieldProductPropertySection: FC;
  // FieldProductSelectGroupSearch: FC<ProductSelectGroupSearchElementProps>;
  SubmitButton: ButtonSubmitComponentType;
};

type ProductUpdateFormElementsType = ProductUpdateFormElementsComponent &
  ProductUpdateFormFields;

const getDefaultFormValues = <T extends ProductUpdateFormValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...productUpdateFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const ProductUpdateFormElements: ProductUpdateFormElementsType = <
  T extends ProductUpdateFormValues,
>(
  props: ProductUpdateFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? productUpdateFormSchema),
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

ProductUpdateFormElements.FieldProductPropertySection =
  function FieldProductPropertySection() {
    const { control, watch } = useFormContext<ProductUpdateFormValues>();

    const categoryList = watch("categoryList");

    return (
      <FormField
        control={control}
        name="propertyItemList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property product</FormLabel>
            <ProductPropertySectionElement
              propertyItemListActive={field.value}
              onSelectPropertyItem={field.onChange}
              categoryList={categoryList}
            />
          </FormItem>
        )}
      />
    );
  };

ProductUpdateFormElements.SubmitButton = function SubmitButton({
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
