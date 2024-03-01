"use client";
import {
  ProductForm,
  ProductId,
  productFormSchema,
  useProductWithRelationQuery,
} from "@/entities/product";
import { usePropertyListByCategoryIdList } from "@/entities/property";
import { useOptionListTransform } from "@/shared/lib/map";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { z } from "zod";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useCategoryDataToForm } from "../_vm/useCategoryDataToForm";
import { ProductFromFrom } from "@/entities/product/_domain/types";

interface ProductFormProps extends HTMLAttributes<HTMLDivElement> {
  productId: ProductId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type ProductFormValues = z.infer<typeof productFormSchema>;

export const ProductFormUpdate: FC<ProductFormProps> = memo((props) => {
  const { productId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingProduct,
    product,
    isFetchedAfterMount,
  } = useProductWithRelationQuery(productId);

  const { toDataIdList, toOptionList } = useOptionListTransform();

  const {
    categoryOptionListTotal,
    categoryOptionListActive,
    isPendingCategoryOptionList,
    setCategoryOptionListSelected,
  } = useCategoryDataToForm(product);

  const {
    propertyList,
    propertyObjectActive,
    setCategoryIdList,
    isPending: isPendingPropertyList,
  } = usePropertyListByCategoryIdList(
    categoryOptionListActive,
    product?.propertyItemListSelected || [],
  );

  const router = useRouter();

  const { productUpdate, isPending: isPendingUpdate } =
    useProductUpdateMutation();

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingCategoryOptionList ||
    isPendingProduct ||
    isPendingPropertyList ||
    !isFetchedAfterMount;

  const handleSelectedProperty = useCallback(
    (propertyListSelected: Array<MultiSelectOptionItem>) => {
      const categoryIdList = toDataIdList(propertyListSelected);
      setCategoryOptionListSelected(toOptionList(categoryIdList));
      setCategoryIdList(categoryIdList.map((item) => item.id));
      return categoryIdList;
    },
    [
      toDataIdList,
      toOptionList,
      setCategoryOptionListSelected,
      setCategoryIdList,
    ],
  );

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!product) {
    return <div>Failed to load product, you may not have permissions</div>;
  }

  const handleSubmit = async (data: ProductFromFrom) => {
    await productUpdate({
      productId: product.id,
      data: {
        ...data,
        id: product.id,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        product={product}
        categorySelectOptionList={categoryOptionListTotal}
        categotySelectOptionListActive={categoryOptionListActive}
        handleCategorySelectOption={handleSelectedProperty}
        propertySelectOptionList={propertyList}
        propertySelectObjectActive={propertyObjectActive}
        // propertySelectPropertyListActive={propertyListWithDataActiveCompleted}
        submitText={"Save change"}
      />
      <Button onClick={() => console.log(propertyList)}>Show state</Button>
      {/* <ProductFormPropertys propertySelectPropertyList={propertyListWithDataActive} /> */}
    </div>
  );
});

ProductFormUpdate.displayName = "ProductFormUpdate";
// const { propertyListWithDataActive } = usePropertyListWithDataActive({
//   propertyList,
//   propertyItemListSelected: product?.propertyItemListSelected ?? [],
// });

// console.log("output_log: product =>>>", product);
// console.log(
//   "output_log: propertyListWithDataActive =>>>",
//   propertyListWithDataActive,
// );

// const categotySelectPropertyListActive = toPropertyList(product.categoryList);
// const propertyListWithDataActiveCompleted = Object.fromEntries(
//   propertyListWithDataActive.map((item) => {
//     return [
//       item.name,
//       item.datatype === "mult"
//         ? item.propertyList.map((property) => property.value)
//         : item.propertyList[0].value,
//     ];
//   }),
// );
// console.log(
//   "output_log: propertyListWithDataActiveCompleted =>>>",
//   propertyListWithDataActiveCompleted,
// );
//
// console.log(
//   "output_log:  categotySelectPropertyList =>>>",
//   categorySelectPropertyList,
// );
// console.log(
//   "output_log:  categotySelectPropertyListActive=>>>",
//   categotySelectPropertyListActive,
// );
//
//
// [
//   {
//     Type: "propertyItem_333da558waew65HOT",
//   },
//   {
//     Color: ["propertyItem_8fsddfew7898d857", "propertyItem_d555fsddfew78981fe"],
//   },
//   {
//     Size: "propertyItem_M68ddtwaew65687M",
//   },
// ];
