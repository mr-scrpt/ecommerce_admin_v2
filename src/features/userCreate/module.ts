import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { UserCreateTx } from "./_tx/userCreate.transaction";
import { CartRepository } from "@/entities/cart/server";
import { CreateUserUseCase } from "./_useCase/createUser.usecase";
import { CreateUserRegistrationUseCase } from "./_useCase/createUserRegistration.usecase";
import { UserRepository } from "@/entities/user/user.server";

const userCreateContainer = new Container();

export const UserCreateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(UserCreateTx).toSelf();
  bind(UserRepository).toSelf();
  bind(CartRepository).toSelf();
  bind(CreateUserUseCase).toSelf();
  bind(CreateUserRegistrationUseCase).toSelf();
});

userCreateContainer.load(UserCreateModule);

export default userCreateContainer;
