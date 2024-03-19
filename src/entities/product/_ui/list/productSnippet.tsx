import { FC, HTMLAttributes } from "react";
import { Product } from "../..";
import Image from "next/image";

interface ProductSnippetProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export const ProductSnippet: FC<ProductSnippetProps> = (props) => {
  const { product } = props;
  const { name, img, price } = product;
  const [imgMain] = img;

  return (
    <div className="flex w-full flex-col gap-2 border p-2">
      <div className="flex w-full justify-center">
        <div className="text-center">{product.name}</div>
      </div>
      <div className="flex w-full justify-center">
        <Image src={imgMain} alt={name} width={120} height={120} />
      </div>
      <div className="text-center">Current price: {price}</div>
    </div>
  );
};
