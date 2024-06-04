import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CartRowRemoveController } from "../_controller/cartRowRemove.controller";

export const cartRowRemoveApi = createApi<CartRowRemoveController["router"]>();

export const cartRowRemoveHttpApi =
  createHttpApi<CartRowRemoveController["router"]>();
