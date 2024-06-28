import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ConsumerCreateController } from "../_controller/consumerCreate.controller";

export const consumerCreateApi =
  createApi<ConsumerCreateController["router"]>();

export const consumerCreateHttpApi =
  createHttpApi<ConsumerCreateController["router"]>();
