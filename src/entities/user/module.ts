import { ContainerModule } from "inversify";
import { ProfileRepository } from "./_repository/profile.repo";
import { UserRepository } from "./_repository/user.repo";
import { ProfileGetService } from "./_service/profileGet.service";
import { ProfileController } from "./_controller/profile.controller";
import { Controller } from "@/kernel/lib/trpc/server";
import { UserRelationGetService } from "./_service/userRelationGet.service";
import { UserGetService } from "./_service/userGet.service";
import { UserController } from "./_controller/user.controller";
import { UserListGetService } from "./_service/userListGet.service";

export const UserModule = new ContainerModule((bind) => {
  bind(UserRepository).toSelf();
  bind(UserRelationGetService).toSelf();
  bind(UserListGetService).toSelf();
  bind(UserGetService).toSelf();

  bind(Controller).to(UserController);
});

export const ProfileModule = new ContainerModule((bind) => {
  bind(ProfileRepository).toSelf();
  bind(ProfileGetService).toSelf();

  bind(Controller).to(ProfileController);
});
