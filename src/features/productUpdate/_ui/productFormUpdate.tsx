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
    setCategoryIdList,
    isPending: isPendingOptionList,
  } = usePropertyListByCategoryIdList(
    categoryOptionListActive,
    product?.optionItemListSelected || [],
  );
  console.log("output_log: categoryOptionList =>>>", propertyList);

  const router = useRouter();

  const { productUpdate, isPending: isPendingUpdate } =
    useProductUpdateMutation();

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingCategoryOptionList ||
    isPendingProduct ||
    isPendingOptionList ||
    !isFetchedAfterMount;

  const handleSelectedOption = useCallback(
    (optionListSelected: Array<MultiSelectOptionItem>) => {
      const categoryIdList = toDataIdList(optionListSelected);
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

  const handleSubmit = async (data: ProductFormValues) => {
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
  console.log("output_log: optionList  =>>>", propertyList);

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        product={product}
        categorySelectOptionList={categoryOptionListTotal}
        categotySelectOptionListActive={categoryOptionListActive}
        handleCategorySelectOption={handleSelectedOption}
        optionSelectOptionList={propertyList}
        // optionSelectOptionListActive={optionListWithDataActiveCompleted}
        submitText={"Save change"}
      />
      <Button onClick={() => console.log(propertyList)}>Show state</Button>
      {/* <ProductFormOptions optionSelectOptionList={optionListWithDataActive} /> */}
    </div>
  );
});

ProductFormUpdate.displayName = "ProductFormUpdate";
// const { optionListWithDataActive } = useOptionListWithDataActive({
//   optionList,
//   optionItemListSelected: product?.optionItemListSelected ?? [],
// });

// console.log("output_log: product =>>>", product);
// console.log(
//   "output_log: optionListWithDataActive =>>>",
//   optionListWithDataActive,
// );

// const categotySelectOptionListActive = toOptionList(product.categoryList);
// const optionListWithDataActiveCompleted = Object.fromEntries(
//   optionListWithDataActive.map((item) => {
//     return [
//       item.name,
//       item.datatype === "mult"
//         ? item.optionList.map((option) => option.value)
//         : item.optionList[0].value,
//     ];
//   }),
// );
// console.log(
//   "output_log: optionListWithDataActiveCompleted =>>>",
//   optionListWithDataActiveCompleted,
// );
//
// console.log(
//   "output_log:  categotySelectOptionList =>>>",
//   categorySelectOptionList,
// );
// console.log(
//   "output_log:  categotySelectOptionListActive=>>>",
//   categotySelectOptionListActive,
// );
//
//
