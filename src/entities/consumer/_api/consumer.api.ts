import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ConsumerController } from "../_controller/consumer.controller";

export const consumerApi = createApi<ConsumerController["router"]>();

export const consumerHttpApi = createHttpApi<ConsumerController["router"]>();
