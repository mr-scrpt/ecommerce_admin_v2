import { ProductCreateForm } from "@/features/productCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface ProductCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const ProductCreate: FC<ProductCreateProps> = (props) => {
  const { callbackUrl } = props;
  return <ProductCreateForm callbackUrl={callbackUrl} />;
};
