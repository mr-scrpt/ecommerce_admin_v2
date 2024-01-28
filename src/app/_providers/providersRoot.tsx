"use client";
import { SessionProvider } from "@/entities/Session/provider/Session.provider";
import { ThemeProvider } from "@/features/Theme/provider/Theme.provider";
import { queryClient } from "@/shared/api/queryClient";
import { ComposeChildren } from "@/shared/lib/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC, HTMLAttributes } from "react";

interface ProvidersRootProps extends HTMLAttributes<HTMLDivElement> {}

export const ProvidersRoot: FC<ProvidersRootProps> = (props) => {
  const { children } = props;
  return (
    <ComposeChildren>
      <ThemeProvider />
      <SessionProvider />
      <QueryClientProvider client={queryClient} />
      {children}
    </ComposeChildren>
  );
};
