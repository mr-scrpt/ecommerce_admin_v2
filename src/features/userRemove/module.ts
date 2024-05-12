import { UserRepository } from "@/entities/user/user.server";
import { Container, ContainerModule } from "inversify";
import { UserRemoveTx } from "./_tx/userRemove.transaction";
import { RemoveUserComplexibleUseCase } from "./_useCase/removeUserComplexible.usecase";

export const userRemoveContainer = new Container();

export const UserRemoveModule = new ContainerModule((bind) => {
  bind(UserRemoveTx).toSelf();
  bind(UserRepository).toSelf();
  bind(RemoveUserComplexibleUseCase).toSelf();
});

userRemoveContainer.load(UserRemoveModule);
