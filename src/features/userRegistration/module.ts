import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { RegistrationUserUseCase } from "./_useCase/createRegistration.usecase";
import { UserRepository } from "@/entities/user/user.server";
import { UserRegistrationTx } from "./_tx/userRegistration.transaction";
import { CartRepository } from "@/entities/cart/server";

const userCreateContainer = new Container();

export const UserCreateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(UserRegistrationTx).toSelf();
  bind(UserRepository).toSelf();
  bind(CartRepository).toSelf();
  bind(RegistrationUserUseCase).toSelf();
});

userCreateContainer.load(UserCreateModule);

export default userCreateContainer;
