import { ContainerModule } from "inversify";
import { ContextFactory } from "./_contextFactory";
import { IValidator, Validator } from "./validator";

export const TrpcModule = new ContainerModule((bind) => {
  bind(ContextFactory).toSelf();
});

export const ValidatorModule = new ContainerModule((bind) => {
  bind(IValidator).to(Validator);
});
