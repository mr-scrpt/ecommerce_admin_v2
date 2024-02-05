"use client";
import { SessionProvider } from "@/entities/user/session";
import { ThemeProvider } from "@/features/Theme/provider/Theme.provider";
import { queryClient } from "@/shared/api/queryClient";
import { ComposeChildren } from "@/shared/lib/react";
import { Confirmation } from "@/widgets/confirmation";
import { ModalProvider } from "@/widgets/modal";
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
      <Confirmation />
      <ModalProvider />

      {children}
    </ComposeChildren>
  );
};
