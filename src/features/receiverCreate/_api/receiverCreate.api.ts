import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ReceiverCreateController } from "../_controller/receiverCreate.controller";

export const receiverCreateApi =
  createApi<ReceiverCreateController["router"]>();

export const receiverCreateHttpApi =
  createHttpApi<ReceiverCreateController["router"]>();
