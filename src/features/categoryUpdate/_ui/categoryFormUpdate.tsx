"use client";
import { CategoryFormElements, useCategoryQuery } from "@/entities/category";
import {
  PropertyFormElements,
  usePropertyListByCategoryQuery,
} from "@/entities/property";
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
import { useCategoryDefaultValues } from "../_vm/useCategoryDefaultValues.model";

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
    isFetchedAfterMount: isFetchedAfterMountCategory,
  } = useCategoryQuery(categoryId);

  const {
    propertyList,
    isPending: isPendingProperty,
    isFetchedAfterMount: isFetchedAfterMountProperty,
  } = usePropertyListByCategoryQuery(categoryId);

  const router = useRouter();

  const { categoryUpdate, isPending: isPendingUpdate } =
    useCategoryUpdateMutation();

  const defaultValues = useCategoryDefaultValues({
    category,
    propertyList,
  });

  const isPendingComplexible =
    isPendingCategory ||
    isPendingUpdate ||
    isPendingProperty ||
    !isFetchedAfterMountCategory ||
    !isFetchedAfterMountProperty;

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
      <CategoryFormElements
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
