import { UserRepository } from "@/entities/user/user.server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { UserUpdateTx } from "./_tx/userUpdate.transaction";
import { UpdateUserUseCase } from "./_useCase/updateUser.usecase";

const userUpdateContainer = new Container();

export const UserUpdateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(UserUpdateTx).toSelf();
  bind(UserRepository).toSelf();
  bind(UpdateUserUseCase).toSelf();
});

userUpdateContainer.load(UserUpdateModule);

export default userUpdateContainer;
