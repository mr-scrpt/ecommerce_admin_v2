import "reflect-metadata";

import userUpdateContainer from "../module";
import { UpdateUserUseCase } from "./updateUser.usecase";

export const updateUserUseCase = userUpdateContainer.get(UpdateUserUseCase);
