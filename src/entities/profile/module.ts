import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { ProfileController } from "./_controller/profile.controller";
import { ProfileRepository } from "./_repository/profile.repo";
import { ProfileGetService } from "./_service/profileGet.service";
import { IProfileRepository } from "@/kernel/domain/profile/repository.type";

export const ProfileModule = new ContainerModule((bind) => {
  bind(IProfileRepository).to(ProfileRepository);
  bind(ProfileGetService).toSelf();

  bind(Controller).to(ProfileController);
});
