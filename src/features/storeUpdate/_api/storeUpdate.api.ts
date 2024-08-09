import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { StoreUpdateController } from "../_controller/storeUpdate.controller";

export const storeUpdateApi = createApi<StoreUpdateController["router"]>();

export const storeUpdateHttpApi =
  createHttpApi<StoreUpdateController["router"]>();
