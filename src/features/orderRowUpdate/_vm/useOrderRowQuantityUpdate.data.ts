import { useState } from "react";

interface OrderRowUpdateDataProps {
  quantity: number;
}

export const useOrderRowUpdateQuantityData = (
  props: OrderRowUpdateDataProps,
) => {
  const { quantity } = props;

  const [quantityActual, setQuantityActual] = useState(quantity);

  const [reached, setReached] = useState(false);

  return {
    quantityActual,
    setQuantityActual,
    reached,
    setReached,
  };
};
