import { ProfileRepository } from "@/entities/user/profile.server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { ProfileUpdateTx } from "./_tx/profileUpdate.transaction";
import { UpdateProfileUseCase } from "./_useCase/updateProfile.usecase";

const userUpdateContainer = new Container();

export const UserUpdateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(ProfileUpdateTx).toSelf();
  bind(ProfileRepository).toSelf();
  bind(UpdateProfileUseCase).toSelf();
});

userUpdateContainer.load(UserUpdateModule);

export default userUpdateContainer;
