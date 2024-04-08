import { UserRepository } from "@/entities/user/user.server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { UserRemoveTx } from "./_tx/userRemove.transaction";
import { RemoveUserComplexibleUseCase } from "./_useCase/removeUserComplexible.usecase";

const userRemoveContainer = new Container();

export const UserRemoveModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(UserRemoveTx).toSelf();
  bind(UserRepository).toSelf();
  bind(RemoveUserComplexibleUseCase).toSelf();
});

userRemoveContainer.load(UserRemoveModule);

export default userRemoveContainer;
