import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CategoryController } from "../_controller/category.controller";

export const categoryApi = createApi<CategoryController["router"]>();

export const categoryHttpApi = createHttpApi<CategoryController["router"]>();
