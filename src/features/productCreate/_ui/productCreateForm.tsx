"use client";
import { ProductForm, productFormSchema } from "@/entities/product";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useProductCreate } from "../_vm/useProductCreate";
import {
  useCategoryLikeOptionList,
  useCategoryListQuery,
} from "@/entities/category";

interface ProductCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type ProductFormValues = z.infer<typeof productFormSchema>;

export const ProductFormCreate: FC<ProductCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { productCreate, isPending: isPendingUpdate } = useProductCreate();

  const { categoryOptionList, isPending: IsPendingCategoryOptionList } =
    useCategoryLikeOptionList();

  console.log("output_log: optionList  =>>>", categoryOptionList);
  const handleSubmit = async (data: ProductFormValues) => {
    await productCreate({
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const isPendingComplexible = isPendingUpdate || IsPendingCategoryOptionList;

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create Product"}
        categoryOptionList={categoryOptionList}
      />
    </div>
  );
};
