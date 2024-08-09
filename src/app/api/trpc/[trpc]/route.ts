import { appModule } from "@/app/module";
import {
  ContextFactory,
  Controller,
  sharedRouter,
  t,
} from "@/kernel/lib/trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const appRouter = appModule.getAll(Controller).map((c) => c.router);
// type AppRouter = typeof appRouter;

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: t.mergeRouters(sharedRouter, ...appRouter),
    createContext: appModule.get(ContextFactory).createContext,
  });

export { handler as GET, handler as POST };
