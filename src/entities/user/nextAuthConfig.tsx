import { configPrivate } from "@/shared/config/private.config";
import { dbClient } from "@/shared/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compact } from "lodash-es";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { createUserUseCase } from "./_useCase/createUser.usecase";

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

const prismaAdapter = PrismaAdapter(dbClient);

const emailToken = TEST_EMAIL_TOKEN
  ? {
      generateVerificationToken: () => TEST_EMAIL_TOKEN ?? "",
      sendVerificationRequest: () =>
        console.log("we don't send emails in test mode"),
    }
  : {};

export const nextAuthConfig: AuthOptions = {
  adapter: {
    ...prismaAdapter,
    createUser: (user) => {
      return createUserUseCase.exec(user);
    },
  } as AuthOptions["adapter"],

  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
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
      ...emailToken,
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
