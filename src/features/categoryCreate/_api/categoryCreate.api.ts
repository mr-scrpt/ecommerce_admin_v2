import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CategoryCreateController } from "../_controller/categoryCreate.controller";

export const categoryCreateApi =
  createApi<CategoryCreateController["router"]>();

export const categoryCreateHttpApi =
  createHttpApi<CategoryCreateController["router"]>();
