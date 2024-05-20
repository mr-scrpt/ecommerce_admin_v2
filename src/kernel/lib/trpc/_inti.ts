import { initTRPC } from "@trpc/server";
import { ContextFactory } from "./_contextFactory";

export const t = initTRPC.context<ContextFactory["createContext"]>().create();
