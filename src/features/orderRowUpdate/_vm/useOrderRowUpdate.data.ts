import { useProductQuery } from "@/entities/product";

interface OrderRowUpdateDataProps {
  productId: string;
}

export const useOrderRowUpdateData = (props: OrderRowUpdateDataProps) => {
  const { productId } = props;
  const {
    product,
    isPending: isProductPending,
    isSuccess: isSuccessProduct,
  } = useProductQuery(productId);

  return {
    product,
    isProductPending,
    isSuccessProduct,
  };
};
