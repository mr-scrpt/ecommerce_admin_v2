"use client";
import { CategoryForm } from "@/entities/category";
import { usePropertyLikeSelectOptionListModel } from "@/entities/property";
import { useOptionListTransform } from "@/shared/lib/map";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { CategoryCreateFormValues } from "../_domain/form.schema";
import { useCategoryCreateMutation } from "../_mutation/categoryCreate.mutation";

interface CategoryCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const CategoryFormCreate: FC<CategoryCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { categoryCreate, isPending: isPendingCreate } =
    useCategoryCreateMutation();

  const { propertySelectOptionList, isPending: isPendingOptionList } =
    usePropertyLikeSelectOptionListModel();

  const { toDataIdList } = useOptionListTransform();

  const handleSubmit = async (data: CategoryCreateFormValues) => {
    const { propertyList, ...categoryData } = data;
    await categoryCreate({
      categoryData,
      propertyData: propertyList.map(({ id }) => ({
        propertyId: id,
      })),
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  const isPendingComplexible = isPendingCreate || isPendingOptionList;

  return (
    <div className={cn(className, "w-full")}>
      <CategoryForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create Category"}
        optionSelectOptionList={propertySelectOptionList}
        handleOptionSelectOption={toDataIdList}
      />
    </div>
  );
};
