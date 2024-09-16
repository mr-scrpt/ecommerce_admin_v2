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
  ProductFormDefaultValues,
  productFormDefaultSchema,
  productDefaultFieldsValues,
} from "../../_domain/form.schema";
import { ProductAboutElement } from "./elements/productAboutElement";
import { ProductArticleElement } from "./elements/productArticleElement";
import { ProductDescriptionElement } from "./elements/productDescriptionElement";
import { ProductImgListElement } from "./elements/productImgListElement";
import { ProductInStockElement } from "./elements/productInStockElement";
import { ProductNameElement } from "./elements/productNameElement";
import { ProductPriceElement } from "./elements/productPriceElement";
import { ProductSelectElement } from "./elements/productSelectElement";
import { ProductMultiSelectElement } from "./elements/productMultiSelectElement";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { ProductSelectSearchElement } from "./elements/productSelectSearchElement";
import { ProductSelectGroupSearchElement } from "./elements/productSelectGroupSearchElement";

interface ProductFormElementsProps<T extends ProductFormDefaultValues>
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit?: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema?: ZodTypeAny;
}

type ProductFormElementsComponent = <
  T extends ProductFormDefaultValues = ProductFormDefaultValues,
>(
  props: ProductFormElementsProps<T>,
) => React.ReactElement;

type ProductFormFields = {
  FieldName: FC;
  FieldArticle: FC;
  FieldPrice: FC;
  FieldInStock: FC;
  FieldDescription: FC;
  FieldAbout: FC;
  FieldImgList: FC;
  FieldProductSelect: FC;
  FieldProductMultiSelect: FC;
  FieldProductSelectSearch: FC;
  FieldProductSelectGroupSearch: FC<ProductSelectGroupSearchElementProps>;
  SubmitButton: ButtonSubmitComponentType;
};

type ProductFormElementsType = ProductFormElementsComponent & ProductFormFields;

const getDefaultFormValues = <T extends ProductFormDefaultValues>(
  defaultValues?: DefaultValues<T> | undefined,
): DefaultValues<T> => {
  return {
    ...productDefaultFieldsValues,
    ...defaultValues,
  } as DefaultValues<T>;
};

export const ProductFormElements: ProductFormElementsType = <
  T extends ProductFormDefaultValues,
>(
  props: ProductFormElementsProps<T>,
) => {
  const { defaultValues, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema ?? productFormDefaultSchema),
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

ProductFormElements.FieldName = function FieldName() {
  const { control } = useFormContext<ProductFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product list</FormLabel>
          <ProductNameElement value={field.value} onChange={field.onChange} />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

ProductFormElements.FieldArticle = function FieldArticle() {
  const { control } = useFormContext<ProductFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="article"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Article</FormLabel>
          <ProductArticleElement
            value={field.value}
            onChange={field.onChange}
          />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

ProductFormElements.FieldPrice = function FieldPrice() {
  const { control } = useFormContext<ProductFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <ProductPriceElement value={field.value} onChange={field.onChange} />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

ProductFormElements.FieldInStock = function FieldInStock() {
  const { control } = useFormContext<ProductFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="inStock"
      render={({ field }) => (
        <FormItem>
          <FormLabel>In stock</FormLabel>
          <ProductInStockElement
            value={field.value}
            onChange={field.onChange}
          />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

ProductFormElements.FieldDescription = function FieldDescription() {
  const { control } = useFormContext<ProductFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <ProductDescriptionElement
            value={field.value}
            onChange={field.onChange}
          />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

ProductFormElements.FieldAbout = function FieldAbout() {
  const { control } = useFormContext<ProductFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="about"
      render={({ field }) => (
        <FormItem>
          <FormLabel>About</FormLabel>
          <ProductAboutElement value={field.value} onChange={field.onChange} />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

ProductFormElements.FieldImgList = function FieldImgList() {
  const { control } = useFormContext<ProductFormDefaultValues>();

  // const handleDeleteImg = (path: string) => {
  //   const list = getValues("imgList");
  //   const result = list.filter((item) => item !== path);
  //   setValue("imgList", result);
  // };

  return (
    <FormField
      control={control}
      name="imgList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Img list</FormLabel>
          <ProductImgListElement
            value={field.value}
            onChange={field.onChange}
            // onRemove={field.onRemove}
          />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

ProductFormElements.FieldProductSelect = function FieldProductSelect() {
  const { control, getFieldState } = useFormContext<ProductFormDefaultValues>();

  if (!getFieldState("productList")) return null;

  return (
    <FormField
      control={control}
      name="productList"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product</FormLabel>
          <ProductSelectElement
            productActive={field.value?.[0]}
            onSelectProduct={field.onChange}
          />
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

ProductFormElements.FieldProductMultiSelect =
  function FieldProductMultiSelect() {
    const { control, getFieldState } =
      useFormContext<ProductFormDefaultValues>();

    if (!getFieldState("productList")) return null;

    return (
      <FormField
        control={control}
        name="productList"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product</FormLabel>
            <ProductMultiSelectElement
              productListActive={field.value}
              onSelectProduct={field.onChange}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

ProductFormElements.FieldProductSelectSearch =
  function FieldProductSelectSearch() {
    const { control, getFieldState } =
      useFormContext<ProductFormDefaultValues>();

    if (!getFieldState("product")) return null;

    return (
      <FormField
        control={control}
        name="product"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product</FormLabel>
            <ProductSelectSearchElement
              productActive={field.value}
              onSelectProduct={field.onChange}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

interface ProductSelectGroupSearchElementProps {
  productInOrder: Array<string>;
}

ProductFormElements.FieldProductSelectGroupSearch =
  function FieldProductSelectSearch(
    props: ProductSelectGroupSearchElementProps,
  ) {
    const { productInOrder } = props;
    const { control, getFieldState } =
      useFormContext<ProductFormDefaultValues>();

    if (!getFieldState("product")) return null;

    return (
      <FormField
        control={control}
        name="product"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product</FormLabel>
            <ProductSelectGroupSearchElement
              productActive={field.value}
              productInOrder={productInOrder}
              onSelectProduct={field.onChange}
            />
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    );
  };

ProductFormElements.SubmitButton = function SubmitButton({
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
// ProductFormElements.FieldHouse = function FieldHouse() {
//   const { control } = useFormContext<ProductFormDefaultValues>();
//
//   return (
//     <FormField
//       control={control}
//       name="house"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>House</FormLabel>
//           <ProductHouseElement value={field.value} onChange={field.onChange} />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };
//
// ProductFormElements.FieldApartment = function FieldApartment() {
//   const { control } = useFormContext<ProductFormDefaultValues>();
//
//   return (
//     <FormField
//       control={control}
//       name="apartment"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Apartment</FormLabel>
//           <ProductApartmentElement
//             value={field.value}
//             onChange={field.onChange}
//           />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };
//
// interface ProductFormSelectProps {
//   userId: string;
//   settlementRef: string;
// }
//
// ProductFormElements.FieldProductSelect = function FieldProductSelect(
//   props: ProductFormSelectProps,
// ) {
//   const { userId, settlementRef } = props;
//   const { control, getFieldState } = useFormContext<ProductFormDefaultValues>();
//
//   if (!getFieldState("productList")) return null;
//
//   return (
//     <FormField
//       control={control}
//       name="productList"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Select product</FormLabel>
//           <ProductSelectElement
//             onSelectProduct={field.onChange}
//             userId={userId}
//             settlementRef={settlementRef}
//             productActive={field.value?.[0]}
//           />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };
//
// ProductFormElements.FieldProductMultiSelect = function FieldProductMultiSelect(
//   props: ProductFormSelectProps,
// ) {
//   const { userId, settlementRef } = props;
//   const { control, getFieldState } = useFormContext<ProductFormDefaultValues>();
//
//   if (!getFieldState("productList")) return null;
//
//   return (
//     <FormField
//       control={control}
//       name="productList"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Select product list</FormLabel>
//           <ProductMultiSelectElement
//             productListActive={field.value}
//             onSelectProduct={field.onChange}
//             userId={userId}
//             settlementRef={settlementRef}
//           />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };
//
// ProductFormElements.SubmitButton = function SubmitButton({
//   isPending,
//   submitText,
//   className,
// }) {
//   return (
//     <Button type="submit" disabled={isPending} className={cn(className)}>
//       {isPending && (
//         <Spinner
//           className="mr-2 h-4 w-4 animate-spin"
//           aria-label="Product updating..."
//         />
//       )}
//       {submitText}
//     </Button>
//   );
// };
