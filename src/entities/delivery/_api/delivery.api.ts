import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { DeliveryController } from "../_controller/delivery.controller";

export const deliveryApi = createApi<DeliveryController["router"]>();

export const deliveryHttpApi = createHttpApi<DeliveryController["router"]>();
