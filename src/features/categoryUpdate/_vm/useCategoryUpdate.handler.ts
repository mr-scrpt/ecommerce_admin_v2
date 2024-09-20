import { useRouter } from "next/navigation";
import { CategoryUpdateFormValues } from "../_domain/form.schema";
import { useCategoryUpdateMutation } from "../_mutation/useCategoryUpdate.mutation";

export interface CategoryUpdateHandlerProps {
  data: {
    categoryId: string;
  };
  onSuccess?: () => void;
  callbackUrl?: string;
}

export const useCategoryUpdateHandler = (props: CategoryUpdateHandlerProps) => {
  const { data, onSuccess, callbackUrl } = props;
  const { categoryId } = data;

  const { categoryUpdate, isPending: isPendingUpdate } =
    useCategoryUpdateMutation();

  const router = useRouter();

  const handleCategoryUpdate = async (data: CategoryUpdateFormValues) => {
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

  return {
    handleCategoryUpdate,
    isPendingUpdate,
  };
};
