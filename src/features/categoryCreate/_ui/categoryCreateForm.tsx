"use client";
import { CategoryForm, categoryFormSchema } from "@/entities/category";
import { Spinner } from "@/shared/ui/icons/spinner";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { cn } from "@/shared/ui/utils";
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

  // useListenCategoryUpdate();

  const { categoryCreate, isPending: isPendingUpdate } = useCategoryCreate();

  // data.category.role
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
      {/* <Button onClick={categoryUpdateEvent}>click</Button> */}
      <CategoryForm
        handleSubmit={handleSubmit}
        isPending={isPendingUpdate}
        // category={data.category}
        submitText={"Create Category"}
      />
    </div>
  );
};
