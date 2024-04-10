import "reflect-metadata";

import userCreateContainer from "../module";
import { CreateUserUseCase } from "./createUser.usecase";

export const createUserUseCase = userCreateContainer.get(CreateUserUseCase);
