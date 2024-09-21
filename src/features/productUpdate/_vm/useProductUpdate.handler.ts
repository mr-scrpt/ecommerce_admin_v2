import { useRouter } from "next/navigation";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { ProductUpdateFormValues } from "../_domain/form.schema";

export interface ProductUpdateHandlerProps {
  data: {
    productId: string;
  };
  onSuccess?: () => void;
  callbackUrl?: string;
}
export const useProductUpdateHandler = (props: ProductUpdateHandlerProps) => {
  const { data, onSuccess, callbackUrl } = props;
  const { productId } = data;
  const {
    productUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useProductUpdateMutation();

  const router = useRouter();

  const handleProductUpdate = async (data: ProductUpdateFormValues) => {
    const { propertyItemList, categoryList, ...productData } = data;
    await productUpdate({
      selector: { id: productId },
      productData,
      categoryData: categoryList.map(({ value }) => ({
        categoryId: value,
      })),
      propertyItemData: propertyItemList.map(({ value }) => ({
        propertyItemId: value,
      })),
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handleProductUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  };
};
