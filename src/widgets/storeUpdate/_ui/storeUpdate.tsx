"use client";
import { StoreFormUpdate } from "@/features/storeUpdate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface StoreUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  storeId: string;
}

export const StoreUpdate: FC<StoreUpdateProps> = (props) => {
  const { callbackUrl, storeId } = props;
  return <StoreFormUpdate callbackUrl={callbackUrl} storeId={storeId} />;
};
