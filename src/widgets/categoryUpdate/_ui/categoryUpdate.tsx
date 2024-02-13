import { CategoryFormUpdate } from "@/features/categoryUpdate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface CategoryUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  slug: string;
}

export const CategoryUpdate: FC<CategoryUpdateProps> = (props) => {
  const { callbackUrl, slug } = props;
  return <CategoryFormUpdate callbackUrl={callbackUrl} categorySlug={slug} />;
};
