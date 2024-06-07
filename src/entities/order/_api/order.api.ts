import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { OrderController } from "../_controller/order.controller";

export const orderApi = createApi<OrderController["router"]>();

export const orderHttpApi = createHttpApi<OrderController["router"]>();
