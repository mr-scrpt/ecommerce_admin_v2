import { ContainerModule } from "inversify";
import { ProfileRepository } from "./_repository/profile.repo";
import { UserRepository } from "./_repository/user.repo";
import { ProfileGetService } from "./_service/profileGet.service";
import { ProfileController } from "./_controller/profile.controller";
import { Controller } from "@/kernel/lib/trpc/server";

export const UserModule = new ContainerModule((bind) => {
  bind(UserRepository).toSelf();
});

export const ProfileModule = new ContainerModule((bind) => {
  bind(ProfileRepository).toSelf();
  bind(ProfileGetService).toSelf();
  bind(Controller).to(ProfileController);
});
