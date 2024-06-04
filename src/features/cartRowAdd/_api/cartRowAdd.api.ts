import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CartRowAddController } from "../_controller/cartRowAdd.controller";

export const cartRowAddApi = createApi<CartRowAddController["router"]>();

export const cartRowAddHttpApi =
  createHttpApi<CartRowAddController["router"]>();
