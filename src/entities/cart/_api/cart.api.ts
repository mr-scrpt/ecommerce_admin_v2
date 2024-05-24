import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CartController } from "../_controller/cart.controller";

export const cartApi = createApi<CartController["router"]>();

export const cartHttpApi = createHttpApi<CartController["router"]>();
