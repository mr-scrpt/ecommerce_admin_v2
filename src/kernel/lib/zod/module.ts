import { ContainerModule } from "inversify";
import { IValidator, Validator } from "../zod/validator";

export const ValidatorModule = new ContainerModule((bind) => {
  bind(IValidator).to(Validator);
});
