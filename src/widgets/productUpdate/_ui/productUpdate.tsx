"use client";
import { ProductFormUpdate } from "@/features/productUpdate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface ProductUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  productId: string;
}

export const ProductUpdate: FC<ProductUpdateProps> = (props) => {
  const { callbackUrl, productId } = props;
  return <ProductFormUpdate callbackUrl={callbackUrl} productId={productId} />;
};
