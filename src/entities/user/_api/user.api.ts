import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { UserController } from "../_controller/user.controller";

export const userApi = createApi<UserController["router"]>();

export const userHttpApi = createHttpApi<UserController["router"]>();
