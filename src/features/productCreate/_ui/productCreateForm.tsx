"use client";
import { useCategoryLikeSelectOptionList } from "@/entities/category";
import { useOptionListByCategoryIdList } from "@/entities/option/_vm/useOptionListByCategoryIdList";
import { ProductForm, productFormSchema } from "@/entities/product";
import { OptionItem } from "@/shared/ui/multiSelect";
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
    optionList,
    setCategoryIdList,
    isPending: isPendingOptionList,
  } = useOptionListByCategoryIdList();

  const { categorySelectOptionList, isPending: isPendingCategoryOptionList } =
    useCategoryLikeSelectOptionList();

  const { toDataIdList } = useOptionListTransform();

  const handleSelectedOption = (optionListSelected: Array<OptionItem>) => {
    const idList = toDataIdList(optionListSelected);
    // setCategoryIdList(idList.map((item) => item.id));
    return idList;
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

  const isPendingComplexible = isPendingCreate || isPendingCategoryOptionList;

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create Product"}
        categorySelectOptionList={categorySelectOptionList}
        handleCategorySelectOption={handleSelectedOption}
      />
    </div>
  );
};
