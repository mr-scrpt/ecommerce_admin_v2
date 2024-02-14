"use client";
import { CategoryFormUpdate } from "@/features/categoryUpdate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface CategoryUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  categoryId: string;
}

export const CategoryUpdate: FC<CategoryUpdateProps> = (props) => {
  const { callbackUrl, categoryId } = props;
  return (
    <CategoryFormUpdate callbackUrl={callbackUrl} categoryId={categoryId} />
  );
};
