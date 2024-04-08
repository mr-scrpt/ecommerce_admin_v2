import "reflect-metadata";

import userUpdateContainer from "../module";
import { UpdateProfileUseCase } from "./updateProfile.usecase";

export const updateProfileUseCase =
  userUpdateContainer.get(UpdateProfileUseCase);
