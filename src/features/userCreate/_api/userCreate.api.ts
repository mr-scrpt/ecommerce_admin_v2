import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { UserCreateController } from "../_controller/userCreate.controller";

export const userCreateApi = createApi<UserCreateController["router"]>();

export const userCreateHttpApi =
  createHttpApi<UserCreateController["router"]>();
