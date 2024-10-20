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
import { ISessionGetRelationService, IUserCreateService } from "./type";

const {
  GITHUB_SECRET,
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
    private readonly createUserService: IUserCreateService,
    private readonly getSessionRelationService: ISessionGetRelationService,
  ) {}
  options: AuthOptions = {
    adapter: {
      ...prismaAdapter,
      createUser: async (user) => {
        console.log("output_log: USER in nextauth =>>>", user);
        return await this.createUserService.execute({ userData: user });
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
