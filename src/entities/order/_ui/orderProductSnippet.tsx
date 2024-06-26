"use client";
import { useProductQuery } from "@/entities/product";
import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import Counter from "@/shared/ui/counter";
import { cn } from "@/shared/ui/utils";
import Image from "next/image";
import { FC, HTMLAttributes, useState } from "react";
import { OrderRow } from "../_domain/orderRow.types";

interface OrderProductSnippetProps extends HTMLAttributes<HTMLDivElement> {
  orderRow: OrderRow;
  applayChangeQuantity: (value: number) => void;
  orderRowRemove: () => void;
}

export const OrderProductSnippet: FC<OrderProductSnippetProps> = (props) => {
  const { orderRow, applayChangeQuantity, orderRowRemove } = props;
  const { productName, productArticle, productImg, price, quantity } = orderRow;

  const { product, isPending } = useProductQuery(orderRow.productId);
  const appearanceDelay = useAppearanceDelay(isPending);
  const [quantityActual, setQuantityActual] = useState(quantity);
  const [reached, setReached] = useState(false);

  if (appearanceDelay) {
    <div>Loading...</div>;
  }
  if (!product) {
    return <div>Failed to load product</div>;
  }

  const onChangeQuantity = (value: number) => {
    setQuantityActual(value);
  };

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-1/5 min-w-[180px] flex-col gap-2 border p-2">
        <div className="flex w-full justify-center">
          <div className="text-center">{productName}</div>
        </div>
        <div className="flex w-full justify-center">
          <div className="text-center text-sm text-gray-400">
            Article: #{productArticle}
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Image src={productImg} alt={productName} width={120} height={120} />
        </div>
      </div>
      <div className="flex flex-grow items-center gap-4 p-4">
        <div className={cn(reached && "text-red-500")}>
          In stock: {product?.inStock}
        </div>
        <Counter
          value={quantity}
          onChange={onChangeQuantity}
          max={product?.inStock}
          setReached={setReached}
        />
        <div className="ml-auto">
          {quantityActual !== quantity && (
            <Button
              onClick={() => {
                applayChangeQuantity(quantityActual);
              }}
            >
              Apply
            </Button>
          )}
        </div>
        <div className="ml-auto">Price: {price}</div>
        <div className="ml-auto">Total: {quantityActual * price}</div>
        <div className="ml-auto">
          <Button
            onClick={() => {
              orderRowRemove();
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};
