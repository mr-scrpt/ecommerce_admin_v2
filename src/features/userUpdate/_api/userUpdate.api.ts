import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { UserUpdateController } from "../_controller/userUpdate.controller";

export const userUpdateApi = createApi<UserUpdateController["router"]>();

export const userUpdateHttpApi =
  createHttpApi<UserUpdateController["router"]>();
