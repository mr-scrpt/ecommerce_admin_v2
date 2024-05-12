import "reflect-metadata";

import profileUpdateContainer from "../module";
import { UpdateProfileUseCase } from "./updateProfile.usecase";

export const updateProfileUseCase =
  profileUpdateContainer.get(UpdateProfileUseCase);
