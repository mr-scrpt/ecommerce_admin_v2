import { StoreCreateForm } from "@/features/storeCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface StoreCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const StoreCreate: FC<StoreCreateProps> = (props) => {
  const { callbackUrl } = props;
  return <StoreCreateForm callbackUrl={callbackUrl} />;
};
