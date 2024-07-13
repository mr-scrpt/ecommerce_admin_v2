import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ReceiverController } from "../_controller/receiver.controller";

export const receiverApi = createApi<ReceiverController["router"]>();

export const receiverHttpApi = createHttpApi<ReceiverController["router"]>();
