import { socketClient } from "@/shared/config/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { AuthOptions } from "next-auth";
import { nextAuthConfig } from "@/kernel/lib/nextauth/server";
import { createUserRegistrationUseCase } from "./_useCase/instans.usecase";

export const nextAuthConfigWithCreateUser: AuthOptions = {
  ...nextAuthConfig,
  adapter: {
    ...nextAuthConfig.adapter,
    createUser: async (user) => {
      const socket = socketClient("");
      try {
        const newUser = await createUserRegistrationUseCase.exec({
          ...user,
          phone: user.phone ?? "",
        });

        await new Promise<void>((resolve, reject) => {
          socket.connect();
          socket.emit(WSEventEnum.USER_CREATE, () => {
            resolve();
          });

          socket.on("error", (error) => {
            reject(error);
          });
        });

        return newUser;
      } catch (error) {
        throw error;
      } finally {
        socket.disconnect();
      }
    },
  } as AuthOptions["adapter"],
};
