import { CategoryCreateForm } from "@/features/categoryCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface CategoryCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const CategoryCreate: FC<CategoryCreateProps> = (props) => {
  const { callbackUrl } = props;
  return <CategoryCreateForm callbackUrl={callbackUrl} />;
};
