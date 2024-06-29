import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { StoreCreateController } from "../_controller/storeCreate.controller";

export const storeCreateApi = createApi<StoreCreateController["router"]>();

export const storeCreateHttpApi =
  createHttpApi<StoreCreateController["router"]>();
