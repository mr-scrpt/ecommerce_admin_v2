import { createServerSideHelpers } from "@trpc/react-query/server";
import { AnyRouter } from "@trpc/server";

export const createPublicServerApi = <T extends AnyRouter>(router: T) =>
  createServerSideHelpers<T>({
    router,
    ctx: () => ({}),
  } as any);
