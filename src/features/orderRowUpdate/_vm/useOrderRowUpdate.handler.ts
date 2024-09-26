import { useOrderRowUpdateQuantityMutation } from "../_mutation/useOrderRowUpdateQuantity.mutation";

export const useOrderRowUpdateHandler = () => {
  const {
    orderRowUpdateQuantity,
    isPending: isOrderRowUpdateQuantityPending,
    isSuccess: isSuccessOrderRowUpdateQuantity,
  } = useOrderRowUpdateQuantityMutation();

  return {
    handleOrderRowUpdate: orderRowUpdateQuantity,
    isOrderRowUpdateQuantityPending,
    isSuccessOrderRowUpdateQuantity,
  };
};
