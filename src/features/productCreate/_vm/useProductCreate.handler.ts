import { useRouter } from "next/navigation";
import { useProductCreateMutation } from "../_mutation/useProductCreate.mutation";
import { ProductCreateFormValues } from "../_domain/form.schema";

export const useProductCreateHandler = (
  onSuccess?: () => void,
  callbackUrl?: string,
) => {
  const { productCreate, isPending, isSuccess } = useProductCreateMutation();

  const router = useRouter();

  const createProductHandler = async (data: ProductCreateFormValues) => {
    const { propertyItemList, categoryList, ...productData } = data;
    console.log(
      "output_log:  =>>> FORMDATA__",
      propertyItemList,
      categoryList,
      productData,
    );
    await productCreate({
      productData,
      categoryData: categoryList.map(({ value }) => ({
        categoryId: value,
      })),
      propertyItemData: propertyItemList.map(({ value }) => ({
        propertyItemId: value,
      })),
    });

    // TODO: Callback and redirect mb move to hook?
    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    createProductHandler,
    isPendingCreate: isPending,
    isSuccessCreate: isSuccess,
  };
};
