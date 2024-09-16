"use client";
import { CategoryFormElements, useCategoryQuery } from "@/entities/category";
import {
  PropertyFormElements,
  usePropertyListByCategoryQuery,
} from "@/entities/property";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
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

  const router = useRouter();

  const { categoryUpdate, isPending: isPendingUpdate } =
    useCategoryUpdateMutation();

  const { defaultValues, isPending, isFetchedAfterMount } =
    useCategoryDefaultValues({
      categoryId,
    });

  if (isPending || !isFetchedAfterMount) {
    return <Spinner aria-label="Loading profile..." />;
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
