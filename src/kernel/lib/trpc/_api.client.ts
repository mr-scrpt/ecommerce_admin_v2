import {
  CreateTRPCClient,
  createTRPCClient,
  createTRPCProxyClient,
  httpBatchLink,
} from "@trpc/client";
import { CreateTRPCReact, createTRPCReact } from "@trpc/react-query";
import { SharedRouter } from "./server";
import { AnyRouter } from "@trpc/server";
import { configPublic } from "@/shared/config/public.config";
import superjson from "superjson";

export const sharedApi = createTRPCReact<SharedRouter>();

export const createApi = <T extends AnyRouter>() =>
  sharedApi as CreateTRPCReact<T, unknown>;

export const sharedHttpApi = createTRPCClient<SharedRouter>({
  links: [
    httpBatchLink({
      url: `${configPublic.PUBLIC_URL}/api/trpc`,
      transformer: superjson,
    }),
  ],
});

export const serverApi = createTRPCProxyClient<SharedRouter>({
  links: [
    httpBatchLink({
      url: `${configPublic.PUBLIC_URL}/api/trpc`,
      transformer: superjson,
    }),
  ],
});

export const createHttpApi = <T extends AnyRouter>() =>
  sharedHttpApi as CreateTRPCClient<T>;
