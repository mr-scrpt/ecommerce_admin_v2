import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CartRowCreateController } from "../_controller/cartRowCreate.controller";

export const cartRowCreateApi = createApi<CartRowCreateController["router"]>();

export const cartRowCreateHttpApi =
  createHttpApi<CartRowCreateController["router"]>();
