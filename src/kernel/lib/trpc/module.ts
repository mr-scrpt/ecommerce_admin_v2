import { ContainerModule } from "inversify";
import { ContextFactory } from "./_contextFactory";

export { Controller } from "./_controller";

export const TrpcModule = new ContainerModule((bind) => {
  bind(ContextFactory).toSelf();
});
