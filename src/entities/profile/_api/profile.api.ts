import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { ProfileController } from "../_controller/profile.controller";

export const profileApi = createApi<ProfileController["router"]>();

export const profileHttpApi = createHttpApi<ProfileController["router"]>();
