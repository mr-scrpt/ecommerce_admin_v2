import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { StoreController } from "../_controller/store.controller";

export const storeApi = createApi<StoreController["router"]>();

export const storeHttpApi = createHttpApi<StoreController["router"]>();
