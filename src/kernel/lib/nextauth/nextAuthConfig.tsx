import { getNetworkClientCookie } from "@/entities/session/coockieParser";
import { configPrivate } from "@/shared/config/private.config";
import { configPublic } from "@/shared/config/public.config";
import { dbClient } from "@/shared/lib/db/instans";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { deleteCookie } from "cookies-next";
import { injectable } from "inversify";
import { compact } from "lodash-es";
import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import {
  SessionGetRelationServiceAbstract,
  UserCreateServiceAbstract,
} from "./type";

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

const { COOKIE_NETWORK_NAME } = configPublic;

const prismaAdapter = PrismaAdapter(dbClient);

@injectable()
export class NextAuthConfig {
  constructor(
    private readonly createUserService: UserCreateServiceAbstract,
    private readonly getSessionRelationService: SessionGetRelationServiceAbstract,
  ) {}
  options: AuthOptions = {
    adapter: {
      ...prismaAdapter,
      createUser: async (user) => {
        return await this.createUserService.execute(user);
      },
    } as AuthOptions["adapter"],

    callbacks: {
      session: async ({ session, user }) => {
        const sessionWithRelation =
          await this.getSessionRelationService.execute({
            session,
            userId: user.id,
          });
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
