import { configPrivate } from "@/shared/config/private.config";
import { dbClient } from "@/shared/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compact } from "lodash-es";
import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import { cookies } from "next/headers";
import { clientNetworkDataSchema } from "./schema";
import { ClientNetworkData } from "./types";
import { deleteCookie } from "cookies-next";
import { COOKIE_NETWORK_NAME } from "./constant";

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
      const c = cookies();

      const clientData = JSON.parse(
        c.get(COOKIE_NETWORK_NAME)?.value ?? "{}",
      ) as ClientNetworkData;

      const clientDataParsed = clientNetworkDataSchema.parse(clientData);

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
    signOut: async ({ session }) => {
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
