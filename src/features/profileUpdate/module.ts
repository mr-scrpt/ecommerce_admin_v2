import { ProfileRepository } from "@/entities/user/profile.server";
import { Container, ContainerModule } from "inversify";
import { ProfileUpdateTx } from "./_tx/profileUpdate.transaction";
import { UpdateProfileUseCase } from "./_useCase/updateProfile.usecase";

export const profileUpdateContainer = new Container();

export const ProfileUpdateModule = new ContainerModule((bind) => {
  bind(ProfileUpdateTx).toSelf();
  bind(ProfileRepository).toSelf();
  bind(UpdateProfileUseCase).toSelf();
});

profileUpdateContainer.load(ProfileUpdateModule);
