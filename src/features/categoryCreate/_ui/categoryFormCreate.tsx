"use client";
import { CategoryFormElements } from "@/entities/category";
import { PropertyFormElements } from "@/entities/property";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import {
  CategoryCreateFormValues,
  categoryCreateFormSchema,
} from "../_domain/form.schema";
import { useCategoryCreateModel } from "../_vm/useCategoryCreate.model";

interface CategoryFormCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const CategoryFormCreate: FC<CategoryFormCreateProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { categoryCreate, isPending: isPendingCreate } =
    useCategoryCreateModel();

  const handleSubmit = async (data: CategoryCreateFormValues) => {
    const { propertyList, ...categoryData } = data;
    await categoryCreate({
      categoryData,
      propertyData: propertyList.map(({ value }) => ({
        propertyId: value,
      })),
    });

    // TODO: Callback and redirect mb move to hook?
    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <CategoryFormElements<CategoryCreateFormValues>
        handleSubmit={handleSubmit}
        schema={categoryCreateFormSchema}
      >
        <CategoryFormElements.FieldCategorySelect />
        <CategoryFormElements.FieldCategoryMultiSelect />

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
