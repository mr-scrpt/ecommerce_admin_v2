"use client";
import { CategoryFormElements } from "@/entities/category";
import { PropertyFormElements } from "@/entities/property";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  CategoryCreateFormValues,
  categoryCreateDefaultFieldsValues,
  categoryCreateFormSchema,
} from "../_domain/form.schema";
import { useCategoryCreateHandler } from "../_vm/useCategoryCreate.handler";

interface CategoryCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const CategoryCreateForm: FC<CategoryCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const { handleCategoryCreate, isPendingCreate } = useCategoryCreateHandler(
    onSuccess,
    callbackUrl,
  );

  return (
    <div className={cn(className, "w-full")}>
      <CategoryFormElements<CategoryCreateFormValues>
        handleSubmit={handleCategoryCreate}
        schema={categoryCreateFormSchema}
        defaultValues={categoryCreateDefaultFieldsValues}
      >
        <PropertyFormElements.FieldPropertyMultiSelect />

        <CategoryFormElements.FieldName />
        <CategoryFormElements.FieldBoard />
        <CategoryFormElements.SubmitButton
          isPending={isPendingCreate}
          submitText="Create Category"
        />
      </CategoryFormElements>
    </div>
  );
};
