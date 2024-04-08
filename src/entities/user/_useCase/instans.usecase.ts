import "reflect-metadata";

import userContainer from "../module";
import { GetProfileUseCase } from "./getProfile.usecase";
import { GetUserUseCase } from "./getUser.usecase";
import { GetUserListUseCase } from "./getUserList.usecase";
import { GetUserListSearchUseCase } from "./getUserListSearch.usecase";
import { RemoveUserUseCase } from "./removeUser.usecase";

export const getProfileUseCase = userContainer.get(GetProfileUseCase);
export const getUserUseCase = userContainer.get(GetUserUseCase);
export const getUserListUseCase = userContainer.get(GetUserListUseCase);
export const getUserListSearchUseCase = userContainer.get(
  GetUserListSearchUseCase,
);
export const removeUserUseCase = userContainer.get(RemoveUserUseCase);
