"use client";
import { ProductUpdateForm } from "@/features/productUpdate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes, memo } from "react";

interface ProductUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  productId: string;
}

export const ProductUpdate: FC<ProductUpdateProps> = memo((props) => {
  const { callbackUrl, productId } = props;
  return <ProductUpdateForm callbackUrl={callbackUrl} productId={productId} />;
});

ProductUpdate.displayName = "ProductUpdate";
