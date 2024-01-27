"use client";
import { ThemeProvider } from "@/features/Theme/provider/ThemeProvider";
import { ComposeChildren } from "@/shared/lib/react";
import { FC, HTMLAttributes } from "react";

interface ProvidersRootProps extends HTMLAttributes<HTMLDivElement> {}

export const ProvidersRoot: FC<ProvidersRootProps> = (props) => {
  const { children } = props;
  return (
    <ComposeChildren>
      <ThemeProvider />
      {children}
    </ComposeChildren>
  );
};
