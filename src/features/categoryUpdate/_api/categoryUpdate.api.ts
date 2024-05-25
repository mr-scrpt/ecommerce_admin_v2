import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CategoryUpdateController } from "../_controller/categoryUpdate.controller";

export const categoryUpdateApi =
  createApi<CategoryUpdateController["router"]>();

export const categoryUpdateHttpApi =
  createHttpApi<CategoryUpdateController["router"]>();
