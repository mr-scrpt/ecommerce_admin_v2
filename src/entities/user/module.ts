import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { UserController } from "./_controller/user.controller";
import { UserRepository } from "./_repository/user.repo";
import { UserGetService } from "./_service/userGet.service";
import { UserListGetService } from "./_service/userListGet.service";
import { UserListSearchService } from "./_service/userListSearch.service";
import { UserRelationGetService } from "./_service/userRelationGet.service";
import { IUserRepository } from "@/kernel/domain/user/repository.type";

export const UserModule = new ContainerModule((bind) => {
  bind(IUserRepository).to(UserRepository);

  bind(UserRelationGetService).toSelf();
  bind(UserListGetService).toSelf();
  bind(UserListSearchService).toSelf();
  bind(UserGetService).toSelf();

  bind(Controller).to(UserController);
});
