import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CartRowUpdateController } from "../_controller/cartRowUpdate.controller";

export const cartRowUpdateApi = createApi<CartRowUpdateController["router"]>();

export const cartRowUpdateHttpApi =
  createHttpApi<CartRowUpdateController["router"]>();
