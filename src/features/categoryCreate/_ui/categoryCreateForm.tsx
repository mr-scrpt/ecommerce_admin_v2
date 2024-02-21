"use client";
import { CategoryForm, categoryFormSchema } from "@/entities/category";
import { useOptionListTransformOption } from "@/entities/option";
import { useOptionLikeSelectOptionList } from "@/entities/option/_vm/useOptionLikeSelectOptionList";
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

  const { categoryCreate, isPending: isPendingCreate } = useCategoryCreate();

  const { optionSelectOptionList, isPending: isPendingOptionList } =
    useOptionLikeSelectOptionList();

  const { toOptionIdList } = useOptionListTransformOption();

  const handleSubmit = async (data: CategoryFormValues) => {
    await categoryCreate({
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  const isPendingComplexible = isPendingCreate || isPendingOptionList;

  return (
    <div className={cn(className, "w-full")}>
      <CategoryForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create Category"}
        optionSelectOptionList={optionSelectOptionList}
        handleOptionSelectOption={toOptionIdList}
      />
    </div>
  );
};
