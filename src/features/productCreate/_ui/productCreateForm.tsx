"use client";
import { useCategoryLikeSelectOptionList } from "@/entities/category";
import { usePropertyListByCategoryIdList } from "@/entities/property";
import { ProductForm, productFormSchema } from "@/entities/product";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useProductCreateMutation } from "../_mutation/productCreate.mutation";
import { useOptionListTransform } from "@/shared/lib/map";

interface ProductCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type ProductFormValues = z.infer<typeof productFormSchema>;

export const ProductFormCreate: FC<ProductCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const { productCreate, isPending: isPendingCreate } =
    useProductCreateMutation();

  const {
    propertyList,
    setCategoryIdList,
    isPending: isPendingOptionList,
  } = usePropertyListByCategoryIdList();

  const { categorySelectOptionList, isPending: isPendingCategoryOptionList } =
    useCategoryLikeSelectOptionList();

  const { toDataIdList } = useOptionListTransform();

  const handleSelectedOption = (
    optionListSelected: Array<MultiSelectOptionItem>,
  ) => {
    const categoryIdList = toDataIdList(optionListSelected);
    setCategoryIdList(categoryIdList.map((item) => item.id));
    return categoryIdList;
  };

  const router = useRouter();
  const handleSubmit = async (data: ProductFormValues) => {
    await productCreate({
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const isPendingComplexible =
    isPendingCreate || isPendingCategoryOptionList || isPendingOptionList;

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create Product"}
        categorySelectOptionList={categorySelectOptionList}
        optionSelectOptionList={propertyList}
        handleCategorySelectOption={handleSelectedOption}
      />
    </div>
  );
};
