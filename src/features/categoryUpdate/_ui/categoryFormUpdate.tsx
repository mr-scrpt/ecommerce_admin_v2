"use client";
import {
  CategoryFormElements,
  useCategoryWithRelationQuery,
} from "@/entities/category";
import { PropertyFormElements } from "@/entities/property";
import { useOptionListTransform } from "@/shared/lib/map";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useMemo } from "react";
import {
  CategoryUpdateFormValues,
  categoryUpdateFormSchema,
} from "../_domain/form.schema";
import { useCategoryUpdateMutation } from "../_mutation/useCategoryUpdate.mutation";

interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  categoryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const CategoryFormUpdate: FC<CategoryFormProps> = (props) => {
  const { categoryId, callbackUrl, className, onSuccess } = props;

  const {
    category,
    isPending: isPendingCategory,
    isFetchedAfterMount,
  } = useCategoryWithRelationQuery(categoryId);

  const router = useRouter();

  const { categoryUpdate, isPending: isPendingUpdate } =
    useCategoryUpdateMutation();

  const { toOptionList } = useOptionListTransform();

  const defaultValues = useMemo(() => {
    return {
      name: category?.name ?? "",
      board: category?.board ?? [],
      propertyList: toOptionList(category?.propertyList ?? []),
    };
  }, [category, toOptionList]);

  const isPendingComplexible =
    isPendingCategory || isPendingUpdate || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!category) {
    return <div>Failed to load category, you may not have permissions</div>;
  }

  const handleSubmit = async (data: CategoryUpdateFormValues) => {
    const { propertyList, ...categoryData } = data;
    await categoryUpdate({
      selector: { id: categoryId },
      categoryData,
      propertyData: propertyList.map(({ value }) => ({ propertyId: value })),
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <CategoryFormElements<CategoryUpdateFormValues>
        defaultValues={defaultValues}
        handleSubmit={handleSubmit}
        schema={categoryUpdateFormSchema}
      >
        <PropertyFormElements.FieldPropertyMultiSelect />
        <CategoryFormElements.FieldName />
        <CategoryFormElements.FieldBoard />
        <CategoryFormElements.SubmitButton
          isPending={isPendingUpdate}
          submitText="Update Category"
        />
      </CategoryFormElements>
    </div>
  );
};
