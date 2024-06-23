import { updateApi, updateHttpApi } from "@/kernel/lib/trpc/client";
import { UserUpdateController } from "../_controller/userUpdate.controller";

export const userUpdateApi = updateApi<UserUpdateController["router"]>();

export const userUpdateHttpApi =
  updateHttpApi<UserUpdateController["router"]>();
