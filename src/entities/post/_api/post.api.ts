import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { PostController } from "../_controller/post.controller";

export const postApi = createApi<PostController["router"]>();

export const postHttpApi = createHttpApi<PostController["router"]>();
