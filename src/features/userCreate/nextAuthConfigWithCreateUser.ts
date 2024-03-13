import { nextAuthConfig } from "@/entities/user/user.server";
import { socketClient } from "@/shared/config/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { AuthOptions } from "next-auth";
import { createUserComplexibleUseCase } from "./_useCase/createUserComplexible.usecase";

export const nextAuthConfigWithCreateUser: AuthOptions = {
  ...nextAuthConfig,
  adapter: {
    ...nextAuthConfig.adapter,
    createUser: async (user) => {
      const socket = socketClient("");
      try {
        const newUser = await createUserComplexibleUseCase.exec(user);

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
  // callbacks: {
  //   session: async ({ session, user }) => {
  //
  //     return {
  //       ...session,
  //       // user: {
  //       //   ...session.user,
  //       //   id: user.id,
  //       //   role: user.role,
  //       // },
  //     };
  //   },
  // },
};
