"use client";
import { CategoryForm, categoryFormSchema } from "@/entities/category";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useCategoryCreate } from "../_vm/useCategoryCreate";

interface CategoryCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const CategoryFormCreate: FC<CategoryCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { categoryCreate, isPending: isPendingUpdate } = useCategoryCreate();

  const handleSubmit = async (data: CategoryFormValues) => {
    await categoryCreate({
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
        isPending={isPendingUpdate}
        submitText={"Create Category"}
      />
    </div>
  );
};
