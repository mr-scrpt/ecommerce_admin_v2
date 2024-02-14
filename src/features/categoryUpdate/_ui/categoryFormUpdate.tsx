"use client";
import {
  CategoryForm,
  CategoryId,
  categoryFormSchema,
  useCategoryBySlugQuery,
  useCategoryQuery,
} from "@/entities/category";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useCategoryUpdate } from "../_vm/useCategoryUpdate";

interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  // categorySlug: string;
  categoryId: CategoryId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const CategoryFormUpdate: FC<CategoryFormProps> = (props) => {
  const { categoryId, callbackUrl, className, onSuccess } = props;

  const { isPending, category } = useCategoryQuery(categoryId);
  const router = useRouter();

  const { categoryUpdate, isPending: isPendingUpdate } = useCategoryUpdate();

  if (isPending) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!category) {
    return <div>Failed to load category, you may not have permissions</div>;
  }

  const handleSubmit = async (data: CategoryFormValues) => {
    await categoryUpdate({
      categoryId: category.id,
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <CategoryForm
        handleSubmit={handleSubmit}
        isPending={isPending || isPendingUpdate}
        category={category}
        submitText={"Save change"}
      />
    </div>
  );
};