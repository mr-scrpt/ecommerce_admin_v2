"use client";
import { configPublic } from "@/kernel/config/public.config";
import { sharedApi } from "@/kernel/lib/trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCUntypedClient, httpBatchLink } from "@trpc/client";
import { AnyRouter } from "@trpc/server";
import { FC, HTMLAttributes, useState } from "react";

interface ProviderTRPCProps extends HTMLAttributes<HTMLDivElement> {}

export const ProviderTRPC: FC<ProviderTRPCProps> = (props) => {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState<TRPCUntypedClient<AnyRouter>>(() =>
    sharedApi.createClient({
      links: [
        httpBatchLink({
          url: `${configPublic.PUBLIC_URL}/api/trpc`,
        }),
      ],
    }),
  );
  return (
    <sharedApi.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </sharedApi.Provider>
  );
};
