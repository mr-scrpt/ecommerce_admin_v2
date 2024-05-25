import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ProfileUpdateController } from "../_controller/profileUpdate.controller";

export const profileUpdateApi = createApi<ProfileUpdateController["router"]>();

export const profileUpdateHttpApi =
  createHttpApi<ProfileUpdateController["router"]>();
