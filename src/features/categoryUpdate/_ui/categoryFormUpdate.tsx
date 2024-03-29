"use client";
import {
  CategoryForm,
  CategoryId,
  categoryFormSchema,
  useCategoryWithRelationQuery,
} from "@/entities/category";
import { usePropertyLikeSelectOptionList } from "@/entities/property";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useCategoryUpdateMutation } from "../_mutation/useCategoryUpdate.mutation";
import { useOptionListTransform } from "@/shared/lib/map";

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

  const { categoryUpdate, isPending: isPendingUpdate } =
    useCategoryUpdateMutation();

  const { propertySelectOptionList, isPending: isPendingOptionList } =
    usePropertyLikeSelectOptionList();

  const { toDataIdList, toOptionList } = useOptionListTransform();

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

  const optionSelectOptionListActive = toOptionList(category.propertyList);

  return (
    <div className={cn(className, "w-full")}>
      <CategoryForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        category={category}
        optionSelectOptionList={propertySelectOptionList}
        optionSelectOptionListActive={optionSelectOptionListActive}
        handleOptionSelectOption={toDataIdList}
        submitText={"Save change"}
      />
    </div>
  );
};
