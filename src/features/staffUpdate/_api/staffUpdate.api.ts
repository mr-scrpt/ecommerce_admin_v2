import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { StaffUpdateController } from "../_controller/staffUpdate.controller";

export const staffUpdateApi = createApi<StaffUpdateController["router"]>();

export const staffUpdateHttpApi =
  createHttpApi<StaffUpdateController["router"]>();
