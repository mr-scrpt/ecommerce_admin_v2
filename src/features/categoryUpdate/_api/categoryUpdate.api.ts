import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CategoryRemoveController } from "../_controller/categoryUpdate.controller";

export const categoryUpdateApi =
  createApi<CategoryRemoveController["router"]>();

export const categoryUpdateHttpApi =
  createHttpApi<CategoryRemoveController["router"]>();
