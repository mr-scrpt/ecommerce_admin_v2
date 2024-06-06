import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { PostController } from "./_controller/post.controller";
import { PostRepository } from "./_repository/post.repo";
import { PostOfficeListGetService } from "./_service/postOfficeListGet.service";

export const PostModule = new ContainerModule((bind) => {
  bind(PostRepository).toSelf();
  bind(PostOfficeListGetService).toSelf();

  bind(Controller).to(PostController);
});
