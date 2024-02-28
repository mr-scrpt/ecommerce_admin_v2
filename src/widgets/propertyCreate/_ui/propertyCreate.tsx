import { PropertyFormCreate } from "@/features/propertyCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface PropertyCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const PropertyCreate: FC<PropertyCreateProps> = (props) => {
  const { callbackUrl } = props;
  return <PropertyFormCreate callbackUrl={callbackUrl} />;
};
