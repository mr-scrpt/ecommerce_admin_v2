"use client";
import { CategoryFormElements } from "@/entities/category";
import { PropertyFormElements } from "@/entities/property";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { categoryUpdateFormSchema } from "../_domain/form.schema";
import { useCategoryUpdateHandler } from "../_vm/useCategoryUpdate.handler";
import { useCategoryUpdateValues } from "../_vm/useCategoryUpdateValues.model";

interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  categoryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const CategoryFormUpdate: FC<CategoryFormProps> = (props) => {
  const { categoryId, callbackUrl, className, onSuccess } = props;

  const { categoryUpdateValues, isPending, isFetchedAfterMount } =
    useCategoryUpdateValues({
      categoryId,
    });

  const { handleCategoryUpdate, isPendingUpdate } = useCategoryUpdateHandler({
    data: { categoryId },
    onSuccess,
    callbackUrl,
  });

  if (isPending || !isFetchedAfterMount) {
    return <Spinner aria-label="Loading profile..." />;
  }

  return (
    <div className={cn(className, "w-full")}>
      <CategoryFormElements
        defaultValues={categoryUpdateValues}
        handleSubmit={handleCategoryUpdate}
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
