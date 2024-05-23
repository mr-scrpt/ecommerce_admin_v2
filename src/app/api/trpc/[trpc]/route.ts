import { appModule } from "@/app/module";
import { Controller } from "@/kernel/lib/trpc/module";
import { ContextFactory, sharedRouter, t } from "@/kernel/lib/trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const routers = appModule.getAll(Controller).map((c) => c.router);

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: t.mergeRouters(sharedRouter, ...routers),
    createContext: appModule.get(ContextFactory).createContext,
  });

export { handler as GET, handler as POST };
