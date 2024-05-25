import { ContainerModule } from "inversify";
import { ContextFactory } from "./_contextFactory";

export const TrpcModule = new ContainerModule((bind) => {
  bind(ContextFactory).toSelf();
});
