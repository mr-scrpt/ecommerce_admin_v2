import { socketClient } from "@/shared/config/socket";
import { nextAuthConfig } from "@/shared/session/server";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { AuthOptions } from "next-auth";
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
          name: user.name ?? null,
          phone: user.phone ?? null,
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
