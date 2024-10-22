"use client";
import { sharedApi } from "@/kernel/lib/trpc/client";
import { configPublic } from "@/shared/config/public.config";
import { buildErrorNotice } from "@/shared/ui/notice/notice";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TRPCUntypedClient, httpBatchLink } from "@trpc/client";
import { AnyRouter } from "@trpc/server";
import { FC, HTMLAttributes, useState } from "react";
import superjson from "superjson";

interface ProviderTRPCProps extends HTMLAttributes<HTMLDivElement> {}

export const ProviderTRPC: FC<ProviderTRPCProps> = (props) => {
  const { children } = props;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: async (error) => {
            console.log("output_log: ERROR QUERY::: =>>>", error.data.message);
            buildErrorNotice(error.data.message);
          },
        }),

        mutationCache: new MutationCache({
          onError: async (error) => {
            console.log(
              "output_log: ERROR MUTATION::: =>>>",
              error.data.message,
            );
            buildErrorNotice(error.data.message);
          },
        }),
      }),
  );
  const [trpcClient] = useState<TRPCUntypedClient<AnyRouter>>(() =>
    sharedApi.createClient({
      links: [
        httpBatchLink({
          url: `${configPublic.PUBLIC_URL}/api/trpc`,
          transformer: superjson,
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
