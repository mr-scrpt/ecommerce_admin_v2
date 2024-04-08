import "reflect-metadata";

import userCreateContainer from "../module";
import { CreateUserUseCase } from "./createUser.usecase";
import { CreateUserRegistrationUseCase } from "./createUserRegistration.usecase";

export const createUserUseCase = userCreateContainer.get(CreateUserUseCase);
export const createUserRegistrationUseCase = userCreateContainer.get(
  CreateUserRegistrationUseCase,
);
