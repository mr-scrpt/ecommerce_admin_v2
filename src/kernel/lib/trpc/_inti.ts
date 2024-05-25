import { initTRPC } from "@trpc/server";
import { ContextFactory } from "./_contextFactory";
import superjson from "superjson";

export const t = initTRPC.context<ContextFactory["createContext"]>().create({
  transformer: superjson,
});
