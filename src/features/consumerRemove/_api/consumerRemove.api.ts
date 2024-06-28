import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ConsumerRemoveController } from "../_controller/consumerRemove.controller";

export const consumerRemoveApi =
  createApi<ConsumerRemoveController["router"]>();

export const consumerRemoveHttpApi =
  createHttpApi<ConsumerRemoveController["router"]>();
