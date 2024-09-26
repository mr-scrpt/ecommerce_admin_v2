import { OrderRow } from "@/kernel/domain/order/orderRow.type";
import { Button } from "@/shared/ui/button";
import Counter from "@/shared/ui/counter";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { useOrderRowUpdateQuantityData } from "../_vm/useOrderRowQuantityUpdate.data";
import { useOrderRowUpdateData } from "../_vm/useOrderRowUpdate.data";
import { useOrderRowUpdateHandler } from "../_vm/useOrderRowUpdate.handler";

interface OrderRowCounterProps extends HTMLAttributes<HTMLDivElement> {
  orderRow: OrderRow;
}

export const OrderRowCounter: FC<OrderRowCounterProps> = (props) => {
  const { orderRow } = props;
  const { productId, quantity, id } = orderRow;

  const {
    handleOrderRowUpdate,
    isSuccessOrderRowUpdateQuantity,
    isOrderRowUpdateQuantityPending,
  } = useOrderRowUpdateHandler();

  const { quantityActual, setQuantityActual, reached, setReached } =
    useOrderRowUpdateQuantityData({ quantity });

  const { product, isProductPending } = useOrderRowUpdateData({ productId });

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
              handleOrderRowUpdate({
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
