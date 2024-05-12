import { UserRepository } from "@/entities/user/user.server";
import { Container, ContainerModule } from "inversify";
import { UserUpdateTx } from "./_tx/userUpdate.transaction";
import { UpdateUserUseCase } from "./_useCase/updateUser.usecase";

export const userUpdateContainer = new Container();

export const UserUpdateModule = new ContainerModule((bind) => {
  bind(UserUpdateTx).toSelf();
  bind(UserRepository).toSelf();
  bind(UpdateUserUseCase).toSelf();
});

userUpdateContainer.load(UserUpdateModule);
