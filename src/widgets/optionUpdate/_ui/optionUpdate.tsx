"use client";
import { OptionFormUpdate } from "@/features/optionUpdate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface OptionUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  optionId: string;
}

export const OptionUpdate: FC<OptionUpdateProps> = (props) => {
  const { callbackUrl, optionId } = props;
  return <OptionFormUpdate callbackUrl={callbackUrl} optionId={optionId} />;
};
