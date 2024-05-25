import { configPrivate } from "@/shared/config/private.config";
import { dbClient } from "@/shared/lib/db/db";
import { COOKIE_NETWORK_NAME } from "@/shared/session/constant";
import { getNetworkClientCookie } from "@/shared/session/coockieParser";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { deleteCookie } from "cookies-next";
import { injectable } from "inversify";
import { compact } from "lodash-es";
import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import { UserCreateServiceAbstract } from "./type";
import { socketClient } from "@/shared/config/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

const {
  GITHUB_SECRET,
  COUNTRY_DEFAULT,
  GITHUB_ID,
  EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT,
  EMAIL_FROM,
  EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD,
  TEST_EMAIL_TOKEN,
} = configPrivate;

const prismaAdapter = PrismaAdapter(dbClient);

@injectable()
export class NextAuthConfig {
  constructor(private readonly createUserService: UserCreateServiceAbstract) {}
  options: AuthOptions = {
    adapter: {
      ...prismaAdapter,
      createUser: async (user) => {
        return await this.createUserService.execute(user);
        //   const socket = socketClient("");
        //   try {
        //     const newUser = await this.createUserService.exec({
        //       ...user,
        //       name: user.name ?? "",
        //       phone: user.phone ?? "",
        //       image: user.image ?? "",
        //     });
        //
        //     await new Promise<void>((resolve, reject) => {
        //       socket.connect();
        //       socket.emit(WSEventEnum.USER_CREATE, () => {
        //         resolve();
        //       });
        //
        //       socket.on("error", (error) => {
        //         reject(error);
        //       });
        //     });
        //
        //     return newUser;
        //   } catch (error) {
        //     throw error;
        //   } finally {
        //     socket.disconnect();
        //   }
      },
    } as AuthOptions["adapter"],

    callbacks: {
      session: async ({ session, user }) => {
        const u = await dbClient.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            cart: true,
          },
        });

        const clientDataParsed = getNetworkClientCookie();

        const sessionWithRelation = {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            cartId: u?.cart?.id ?? "",
            role: user.role,
          },
          clientNetworkData: clientDataParsed ?? {
            country_code: COUNTRY_DEFAULT,
          },
        };

        return sessionWithRelation;
      },
    },
    events: {
      signOut: async () => {
        deleteCookie(COOKIE_NETWORK_NAME);
      },
    },

    pages: {
      signIn: "/auth/sign-in",
      newUser: "/auth/new-user",
      verifyRequest: "/auth/verify-request",
      error: "/when-error-page",
      signOut: "/by-by",
    },
    providers: compact([
      EmailProvider({
        ...this.emailToken,
        server: {
          host: EMAIL_SERVER_HOST,
          port: EMAIL_SERVER_PORT,
          auth: {
            user: EMAIL_SERVER_USER,
            pass: EMAIL_SERVER_PASSWORD,
          },
        },
        from: EMAIL_FROM,
      }),
      GITHUB_ID &&
        GITHUB_SECRET &&
        GithubProvider({
          clientId: GITHUB_ID ?? "",
          clientSecret: GITHUB_SECRET ?? "",
        }),
    ]),
  };

  get emailToken() {
    return TEST_EMAIL_TOKEN
      ? {
          generateVerificationToken: () => TEST_EMAIL_TOKEN ?? "",
          sendVerificationRequest: () =>
            console.log("we don't send emails in test mode"),
        }
      : {};
  }
}
// const emailToken = TEST_EMAIL_TOKEN
//   ? {
//       generateVerificationToken: () => TEST_EMAIL_TOKEN ?? "",
//       sendVerificationRequest: () =>
//         console.log("we don't send emails in test mode"),
//     }
//   : {};
//
// export const nextAuthConfig: AuthOptions = {
//   adapter: {
//     ...prismaAdapter,
//   } as AuthOptions["adapter"],
//
//   callbacks: {
//     session: async ({ session, user }) => {
//       const u = await dbClient.user.findUnique({
//         where: {
//           id: user.id,
//         },
//         include: {
//           cart: true,
//         },
//       });
//
//       const clientDataParsed = getNetworkClientCookie();
//
//       const sessionWithRelation = {
//         ...session,
//         user: {
//           ...session.user,
//           id: user.id,
//           cartId: u?.cart?.id ?? "",
//           role: user.role,
//         },
//         clientNetworkData: clientDataParsed ?? {
//           country_code: COUNTRY_DEFAULT,
//         },
//       };
//
//       return sessionWithRelation;
//     },
//   },
//   events: {
//     signOut: async () => {
//       deleteCookie(COOKIE_NETWORK_NAME);
//     },
//   },
//
//   pages: {
//     signIn: "/auth/sign-in",
//     newUser: "/auth/new-user",
//     verifyRequest: "/auth/verify-request",
//     error: "/when-error-page",
//     signOut: "/by-by",
//   },
//   providers: compact([
//     EmailProvider({
//       ...emailToken,
//       server: {
//         host: EMAIL_SERVER_HOST,
//         port: EMAIL_SERVER_PORT,
//         auth: {
//           user: EMAIL_SERVER_USER,
//           pass: EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: EMAIL_FROM,
//     }),
//     GITHUB_ID &&
//       GITHUB_SECRET &&
//       GithubProvider({
//         clientId: GITHUB_ID ?? "",
//         clientSecret: GITHUB_SECRET ?? "",
//       }),
//   ]),
// };
