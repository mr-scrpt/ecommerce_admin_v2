"use client";
import {
  ProductFormLayout,
  ProductId,
  useProductWithRelationQuery,
} from "@/entities/product";
import { ProductFromFrom } from "@/entities/product/_domain/types";
import { usePropertyListByCategoryIdList } from "@/entities/property";
import { useOptionListTransform } from "@/shared/lib/map";
import { Spinner } from "@/shared/ui/icons/spinner";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useCategoryDataToForm } from "../_vm/useCategoryDataToForm";

interface ProductFormProps extends HTMLAttributes<HTMLDivElement> {
  productId: ProductId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

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
    productWithActiveCategory,
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
      // console.log("output_log: in callback =>>>", propertyListSelected);
      const categoryIdList = toDataIdList(propertyListSelected);
      // console.log("output_log:  categoryIdList =>>>", categoryIdList);
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

  console.log(
    "output_log: product with active =>>>",
    productWithActiveCategory,
  );

  return (
    <div className={cn(className, "w-full")}>
      <ProductFormLayout
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        product={productWithActiveCategory}
        categorySelectOptionList={categoryOptionListTotal}
        categotySelectOptionListActive={categoryOptionListActive}
        handleCategorySelectOption={handleSelectedProperty}
        propertySelectOptionList={propertyList}
        propertySelectObjectActive={propertyObjectActive}
        submitText={"Save change"}
      />
    </div>
  );
});

ProductFormUpdate.displayName = "ProductFormUpdate";
