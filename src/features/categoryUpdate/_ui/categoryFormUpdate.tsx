"use client";
import {
  CategoryForm,
  CategoryId,
  categoryFormSchema,
  useCategoryQuery,
  useCategoryWithRelationQuery,
} from "@/entities/category";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useCategoryUpdate } from "../_vm/useCategoryUpdate";
import {
  useOptionLikeSelectOptionList,
  useOptionListTransformOption,
} from "@/entities/option";

interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  categoryId: CategoryId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const CategoryFormUpdate: FC<CategoryFormProps> = (props) => {
  const { categoryId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingCategory,
    isFetchedAfterMount,
    category,
  } = useCategoryWithRelationQuery(categoryId);

  const router = useRouter();

  const { categoryUpdate, isPending: isPendingUpdate } = useCategoryUpdate();

  const { optionSelectOptionList, isPending: isPendingOptionList } =
    useOptionLikeSelectOptionList();

  const { toOptionIdList, toOptionList } = useOptionListTransformOption();

  const isPendingComplexible =
    isPendingCategory ||
    isPendingUpdate ||
    !isFetchedAfterMount ||
    isPendingOptionList;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!category) {
    return <div>Failed to load category, you may not have permissions</div>;
  }

  const handleSubmit = async (data: CategoryFormValues) => {
    await categoryUpdate({
      categoryId: category.id,
      data: {
        ...data,
        id: category.id,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const optionSelectOptionListActive = toOptionList(category.optionList);

  return (
    <div className={cn(className, "w-full")}>
      <CategoryForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        category={category}
        optionSelectOptionList={optionSelectOptionList}
        optionSelectOptionListActive={optionSelectOptionListActive}
        handleOptionSelectOption={toOptionIdList}
        submitText={"Save change"}
      />
    </div>
  );
};
