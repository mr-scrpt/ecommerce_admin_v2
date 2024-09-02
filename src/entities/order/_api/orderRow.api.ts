import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { OrderRowController } from "../_controller/orderRow.controller";

export const orderRowApi = createApi<OrderRowController["router"]>();

export const orderHttpApi = createHttpApi<OrderRowController["router"]>();
