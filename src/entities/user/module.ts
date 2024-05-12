import { Container, ContainerModule } from "inversify";
import { ProfileRepository } from "./_repository/profile.repo";
import { UserRepository } from "./_repository/user.repo";
import { GetProfileUseCase } from "./_useCase/getProfile.usecase";
import { GetUserUseCase } from "./_useCase/getUser.usecase";
import { GetUserListUseCase } from "./_useCase/getUserList.usecase";
import { GetUserListSearchUseCase } from "./_useCase/getUserListSearch.usecase";
import { RemoveUserUseCase } from "./_useCase/removeUser.usecase";

export const userContainer = new Container();

export const UserModule = new ContainerModule((bind) => {
  bind(UserRepository).toSelf();
  bind(ProfileRepository).toSelf();
  bind(GetProfileUseCase).toSelf();
  bind(GetUserUseCase).toSelf();
  bind(GetUserListUseCase).toSelf();
  bind(GetUserListSearchUseCase).toSelf();
  bind(RemoveUserUseCase).toSelf();
});

userContainer.load(UserModule);
