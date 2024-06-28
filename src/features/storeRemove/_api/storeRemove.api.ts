import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { StoreRemoveController } from "../_controller/storeRemove.controller";

export const storeRemoveApi = createApi<StoreRemoveController["router"]>();

export const storeRemoveHttpApi =
  createHttpApi<StoreRemoveController["router"]>();
