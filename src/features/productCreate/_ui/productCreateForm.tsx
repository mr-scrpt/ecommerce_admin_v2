"use client";
import { ProductFormLayout } from "@/entities/product";
import { ProductFromFrom } from "@/entities/product/_domain/types";
import { usePropertyListByCategoryIdList } from "@/entities/property";
import { useOptionListTransform } from "@/shared/lib/map";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { useProductCreateMutation } from "../_mutation/productCreate.mutation";
import { useCategoryDataToForm } from "../_vm/useCategoryDataToForm";

interface ProductCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const ProductFormCreate: FC<ProductCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const {
    categoryOptionListTotal,
    categoryOptionListActive,
    isPendingCategoryOptionList,
    setCategoryOptionListSelected,
  } = useCategoryDataToForm();

  const { productCreate, isPending: isPendingCreate } =
    useProductCreateMutation();

  const {
    propertyList,
    setCategoryIdList,
    isPending: isPendingPropertyList,
  } = usePropertyListByCategoryIdList(categoryOptionListActive, []);

  const router = useRouter();

  // TODO: What is the type?
  const handleSubmit = async (data: ProductFromFrom) => {
    const { categoryList, propertyItemListSelected, ...productData } = data;

    await productCreate({
      productData,
      propertyItemData: propertyItemListSelected.map(({ id }) => ({
        propertyItemId: id,
      })),
      categoryData: categoryList.map(({ id }) => ({ categoryId: id })),
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  const { toDataIdList, toOptionList } = useOptionListTransform();

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
  const isPendingComplexible =
    isPendingCreate || isPendingCategoryOptionList || isPendingPropertyList;

  return (
    <div className={cn(className, "w-full")}>
      <ProductFormLayout
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create Product"}
        categorySelectOptionList={categoryOptionListTotal}
        propertySelectOptionList={propertyList}
        handleCategorySelectOption={handleSelectedProperty}
      />
    </div>
  );
};
