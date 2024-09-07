import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { PostController } from "./_controller/post.controller";
import { PostRepository } from "./_repository/post.repo";
import { PostOfficeListGetBySettlementRefService } from "./_service/postOfficeListGetBySettlement.service";
import { IPostRepository } from "@/kernel/domain/post/repository.type";
import { PostOfficeGetService } from "./_service/postOfficeGet.service";

export const PostModule = new ContainerModule((bind) => {
  bind(IPostRepository).to(PostRepository);

  bind(PostOfficeGetService).toSelf();
  bind(PostOfficeListGetBySettlementRefService).toSelf();

  bind(Controller).to(PostController);
});
