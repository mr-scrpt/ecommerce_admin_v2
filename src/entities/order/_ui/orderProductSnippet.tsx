import { FC, HTMLAttributes } from "react";
import { OrderRow } from "../_domain/orderRow.types";
import Image from "next/image";

interface OrderProductSnippetProps extends HTMLAttributes<HTMLDivElement> {
  product: OrderRow;
}

export const OrderProductSnippet: FC<OrderProductSnippetProps> = (props) => {
  const { product } = props;
  const { productName, productArticle, productImg, price, quantity } = product;

  return (
    <div className="flex flex-col gap-2 border p-2">
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
      <div className="text-center">Price: {price}</div>
    </div>
  );
};
