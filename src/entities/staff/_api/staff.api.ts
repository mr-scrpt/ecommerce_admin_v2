import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { StaffController } from "../_controller/staff.controller";

export const staffApi = createApi<StaffController["router"]>();

export const staffHttpApi = createHttpApi<StaffController["router"]>();
