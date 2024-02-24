"use client";
import {
  ProductForm,
  ProductId,
  productFormSchema,
  useProductWithRelationQuery,
} from "@/entities/product";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useCategoryLikeSelectOptionList } from "@/entities/category";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useOptionListTransform } from "@/shared/lib/map";
import {
  useOptionListByCategoryIdList,
  useOptionListWithDataActive,
} from "@/entities/option";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { ProductFormOptions } from "@/entities/product/_ui/productFormOptions";

interface ProductFormProps extends HTMLAttributes<HTMLDivElement> {
  productId: ProductId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type ProductFormValues = z.infer<typeof productFormSchema>;

export const ProductFormUpdate: FC<ProductFormProps> = (props) => {
  const { productId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingProduct,
    product,
    isFetchedAfterMount,
  } = useProductWithRelationQuery(productId);

  const {
    optionList,
    setCategoryIdList,
    isPending: isPendingOptionList,
  } = useOptionListByCategoryIdList();

  const { optionListWithDataActive } = useOptionListWithDataActive({
    optionList,
    optionItemListSelected: product?.optionItemListSelected ?? [],
  });

  const router = useRouter();

  const { productUpdate, isPending: isPendingUpdate } =
    useProductUpdateMutation();

  const { categorySelectOptionList, isPending: isPendingCategoryOptionList } =
    useCategoryLikeSelectOptionList();

  const { toDataIdList, toOptionList } = useOptionListTransform();

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingCategoryOptionList ||
    isPendingProduct ||
    !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!product) {
    return <div>Failed to load product, you may not have permissions</div>;
  }
  const handleSelectedOption = (
    optionListSelected: Array<MultiSelectOptionItem>,
  ) => {
    const categoryIdList = toDataIdList(optionListSelected);
    setCategoryIdList(categoryIdList.map((item) => item.id));
    return categoryIdList;
  };

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

  const categotySelectOptionListActive = toOptionList(product.categoryList);

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        product={product}
        categorySelectOptionList={categorySelectOptionList}
        categotySelectOptionListActive={categotySelectOptionListActive}
        optionSelectOptionList={optionListWithDataActive}
        handleCategorySelectOption={handleSelectedOption}
        submitText={"Save change"}
      />
      {/* <ProductFormOptions optionSelectOptionList={optionListWithDataActive} /> */}
    </div>
  );
};
