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

interface CategoryCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const CategoryFormCreate: FC<CategoryCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { categoryCreate, isPending: isPendingCreate } =
    useCategoryCreateModel();

  // const { propertySelectOptionList, isPending: isPendingOptionList } =
  //   usePropertyListToSelectModel();
  //
  // const { toDataIdList } = useOptionListTransform();

  const handleSubmit = async (data: CategoryCreateFormValues) => {
    console.log("output_log: cldatata =>>>", data);
    const { propertyList, ...categoryData } = data;
    await categoryCreate({
      categoryData,
      propertyData: propertyList.map(({ value }) => ({
        propertyId: value,
      })),
    });

    onSuccess?.();

    // if (callbackUrl) {
    //   router.push(callbackUrl);
    // }
  };

  return (
    <div className={cn(className, "w-full")}>
      <CategoryFormElements<CategoryCreateFormValues>
        handleSubmit={handleSubmit}
        schema={categoryCreateFormSchema}
      >
        <PropertyFormElements.FieldSelectProperty />
        <CategoryFormElements.FieldName />
        <CategoryFormElements.FieldBoard />
        <CategoryFormElements.SubmitButton
          isPending={false}
          submitText="Create Category"
        />
      </CategoryFormElements>
    </div>
  );
};
