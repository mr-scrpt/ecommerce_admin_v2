"use client";
import {
  CategoryForm,
  CategoryFormElements,
  categoryFormDefaultSchema,
} from "@/entities/category";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useCategoryUpdateMutation } from "../_mutation/useCategoryUpdate.mutation";
import { useOptionListTransform } from "@/shared/lib/map";
import { useCategoryWithRelationQuery } from "@/entities/category";
import {
  PropertyFormElements,
  usePropertyListToSelectModel,
} from "@/entities/property";
import {
  CategoryUpdateFormValues,
  categoryUpdateFormSchema,
} from "../_domain/form.schema";
import { categoryUpdateSchema } from "../_domain/schema";

interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  categoryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

// type CategoryFormValues = z.infer<typeof categoryFormDefaultSchema>;

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

  const { propertySelectOptionList, isPending: isPendingOptionList } =
    usePropertyListToSelectModel();

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
        // categoryData={category}
        defaultValues={{
          name: category.name,
          board: category.board,
          propertyList: toOptionList(category.propertyList),
        }}
        handleSubmit={handleSubmit}
        schema={categoryUpdateFormSchema}
      >
        <PropertyFormElements.FieldSelectProperty />
        <CategoryFormElements.FieldName />
        <CategoryFormElements.FieldBoard />
        <CategoryFormElements.SubmitButton
          isPending={isPendingUpdate}
          submitText="Update Category"
        />
      </CategoryFormElements>
      {/* <CategoryForm */}
      {/*   handleSubmit={handleSubmit} */}
      {/*   isPending={isPendingComplexible} */}
      {/*   category={category} */}
      {/*   optionSelectOptionList={propertySelectOptionList} */}
      {/*   optionSelectOptionListActive={optionSelectOptionListActive} */}
      {/*   handleOptionSelectOption={toDataIdList} */}
      {/*   submitText={"Save change"} */}
      {/* /> */}
    </div>
  );
  return <div>TODO</div>;
};
