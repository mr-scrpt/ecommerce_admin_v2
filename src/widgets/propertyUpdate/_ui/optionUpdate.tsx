"use client";
import { PropertyFormUpdate } from "@/features/propertyUpdate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface PropertyUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  propertyId: string;
}

export const PropertyUpdate: FC<PropertyUpdateProps> = (props) => {
  const { callbackUrl, propertyId } = props;
  return (
    <PropertyFormUpdate callbackUrl={callbackUrl} propertyId={propertyId} />
  );
};
