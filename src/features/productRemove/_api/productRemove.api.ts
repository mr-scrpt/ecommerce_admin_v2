import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ProductRemoveController } from "../_controller/productRemove.controller";

export const productRemoveApi = createApi<ProductRemoveController["router"]>();

export const productRemoveHttpApi =
  createHttpApi<ProductRemoveController["router"]>();
