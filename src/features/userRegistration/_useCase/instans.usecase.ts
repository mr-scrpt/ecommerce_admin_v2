import "reflect-metadata";

import userCreateContainer from "../module";
import { RegistrationUserUseCase } from "./createRegistration.usecase";

export const createUserRegistrationUseCase = userCreateContainer.get(
  RegistrationUserUseCase,
);
