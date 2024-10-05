import { useRouter } from "next/navigation";
import { CategoryUpdateFormValues } from "../_domain/form.schema";
import { useCategoryUpdateMutation } from "../_mutation/useCategoryUpdate.mutation";
import { HandlerFormBaseProps } from "@/shared/lib/hook";

export interface CategoryUpdateHandlerProps extends HandlerFormBaseProps {
  data: {
    categoryId: string;
  };
}

export const useCategoryUpdateHandler = (props: CategoryUpdateHandlerProps) => {
  const { data, onSuccess, callbackUrl } = props;
  const { categoryId } = data;

  const {
    categoryUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useCategoryUpdateMutation();

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
    isSuccessUpdate,
  };
};
