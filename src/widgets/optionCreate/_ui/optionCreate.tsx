import { OptionFormCreate } from "@/features/propertyCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface OptionCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
}

export const OptionCreate: FC<OptionCreateProps> = (props) => {
  const { callbackUrl } = props;
  return <OptionFormCreate callbackUrl={callbackUrl} />;
};
