import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { StaffRemoveController } from "../_controller/staffRemove.controller";

export const staffRemoveApi = createApi<StaffRemoveController["router"]>();

export const staffRemoveHttpApi =
  createHttpApi<StaffRemoveController["router"]>();
