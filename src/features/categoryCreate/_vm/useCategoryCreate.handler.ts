import { useRouter } from "next/navigation";
import { CategoryCreateFormValues } from "../_domain/form.schema";
import { useCategoryCreateMutation } from "../_mutation/useCategoryCreate.mutation";

export const useCategoryCreateHandler = (
  onSuccess?: () => void,
  callbackUrl?: string,
) => {
  const {
    categoryCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useCategoryCreateMutation();

  const router = useRouter();

  const handleCategoryCreate = async (data: CategoryCreateFormValues) => {
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

  return {
    handleCategoryCreate,
    isPendingCreate,
    isSuccessCreate,
  };
};
