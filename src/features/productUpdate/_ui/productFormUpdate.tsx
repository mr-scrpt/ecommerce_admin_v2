"use client";
import {
  ProductFormLayout,
  useProductWithRelationQuery,
} from "@/entities/product";
import { ProductFromForm } from "@/entities/product/_domain/product.types";
import { useOptionListTransform } from "@/shared/lib/map";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useCategoryDataToFormModel } from "../_vm/useCategoryDataToForm.model";
import { usePropertyListByCategoryIdListModel } from "@/entities/property";
import { SelectOptionItem } from "@/shared/type/select";

interface ProductFormProps extends HTMLAttributes<HTMLDivElement> {
  productId: string;
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
  } = useProductWithRelationQuery({ id: productId });

  const { toDataIdList, toOptionList } = useOptionListTransform();

  const {
    categoryOptionListTotal,
    categoryOptionListActive,
    isPendingCategoryOptionList,
    setCategoryOptionListSelected,
    productWithActiveCategory,
  } = useCategoryDataToFormModel(product);

  const {
    propertyList,
    propertyObjectActive,
    setCategoryIdList,
    isPending: isPendingPropertyList,
  } = usePropertyListByCategoryIdListModel(
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
    (propertyListSelected: Array<SelectOptionItem>) => {
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

  const handleSubmit = async (data: ProductFromForm) => {
    const { categoryList, propertyItemListSelected, ...productData } = data;
    console.log("output_log: categoryList =>>>", categoryList);
    await productUpdate({
      selector: { id: productId },
      productData,
      propertyItemData: propertyItemListSelected.map(({ id }) => ({
        propertyItemId: id,
      })),
      categoryData: categoryList.map(({ id }) => ({ categoryId: id })),
    });

    onSuccess?.();

    // if (callbackUrl) {
    //   router.push(callbackUrl);
    // }
  };

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
