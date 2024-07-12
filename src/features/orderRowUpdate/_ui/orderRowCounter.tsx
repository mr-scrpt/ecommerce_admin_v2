import { Button } from "@/shared/ui/button";
import Counter from "@/shared/ui/counter";
import { FC, HTMLAttributes, useState } from "react";
import { useOrderRowUpdateQuantityMutation } from "../_mutation/useOrderRowUpdateQuantity.mutation";
import { useProductQuery } from "@/entities/product";
import { cn } from "@/shared/ui/utils";
import { OrderRow } from "@/kernel/domain/order/orderRow.type";

interface OrderRowCounterProps extends HTMLAttributes<HTMLDivElement> {
  orderRow: OrderRow;
}

export const OrderRowCounter: FC<OrderRowCounterProps> = (props) => {
  const { orderRow } = props;
  const { productId, quantity, id } = orderRow;

  const [quantityActual, setQuantityActual] = useState(quantity);

  const [reached, setReached] = useState(false);

  const {
    orderRowUpdateQuantity,
    isPending: isOrderRowUpdateQuantityPending,
    isSuccess: isSuccessOrderRowUpdateQuantity,
  } = useOrderRowUpdateQuantityMutation();

  const {
    product,
    isPending: isProductPending,
    isSuccess: isSuccessProduct,
  } = useProductQuery(productId);

  const isPendingComplexity =
    isOrderRowUpdateQuantityPending || isProductPending;

  if (isPendingComplexity) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { inStock, price } = product;

  return (
    <>
      <div className={cn(reached && "text-red-500")}>
        In stock: {product?.inStock}
      </div>
      <Counter
        value={quantity}
        onChange={setQuantityActual}
        max={inStock}
        setReached={setReached}
      />
      <div className="ml-auto flex flex-grow">
        {quantityActual !== quantity && (
          <Button
            onClick={() => {
              orderRowUpdateQuantity({
                selector: { id },
                orderRowData: { quantity: quantityActual },
              });
            }}
          >
            Apply
          </Button>
        )}
      </div>
      <div className="ml-auto">Total by products: {quantityActual * price}</div>
    </>
  );
};
