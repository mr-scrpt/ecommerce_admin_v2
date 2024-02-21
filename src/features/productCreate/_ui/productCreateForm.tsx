"use client";
import {
  useCategoryLikeSelectOptionList,
  useCategoryListTransformOption,
} from "@/entities/category";
import { ProductForm, productFormSchema } from "@/entities/product";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useProductCreate } from "../_vm/useProductCreate";

interface ProductCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type ProductFormValues = z.infer<typeof productFormSchema>;

export const ProductFormCreate: FC<ProductCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { productCreate, isPending: isPendingCreate } = useProductCreate();

  const { categorySelectOptionList, isPending: IsPendingCategoryOptionList } =
    useCategoryLikeSelectOptionList();

  const { toCategoryIdList } = useCategoryListTransformOption();

  const handleSubmit = async (data: ProductFormValues) => {
    await productCreate({
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const isPendingComplexible = isPendingCreate || IsPendingCategoryOptionList;

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create Product"}
        categorySelectOptionList={categorySelectOptionList}
        handleCategoryOptionSelect={toCategoryIdList}
      />
    </div>
  );
};
