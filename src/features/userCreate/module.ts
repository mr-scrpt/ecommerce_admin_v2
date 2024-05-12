import { UserRepository } from "@/entities/user/user.server";
import { CreateUserService } from "@/shared/session/types";
import { Container, ContainerModule } from "inversify";
import { UserCreateTx } from "./_tx/userCreate.transaction";
import { CreateUserUseCase } from "./_useCase/createUser.usecase";
import { CreateUserRegistrationUseCase } from "./_useCase/createUserRegistration.usecase";

export const userCreateContainer = new Container();

export const UserCreateModule = new ContainerModule((bind) => {
  bind(UserRepository).toSelf();
  bind(UserCreateTx).toSelf();
  bind(CreateUserUseCase).toSelf();
  bind(CreateUserRegistrationUseCase).toSelf();
  bind(CreateUserService).to(CreateUserRegistrationUseCase);
});

userCreateContainer.load(UserCreateModule);
