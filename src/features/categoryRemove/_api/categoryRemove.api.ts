import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CategoryRemoveController } from "../_controller/categoryRemove.controller";

export const categoryRemoveApi =
  createApi<CategoryRemoveController["router"]>();

export const categoryRemoveHttpApi =
  createHttpApi<CategoryRemoveController["router"]>();
