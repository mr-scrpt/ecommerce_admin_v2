import { configPrivate } from "@/shared/config/private.config";
import { dbClient } from "@/shared/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compact } from "lodash-es";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

const {
  GITHUB_SECRET,
  GITHUB_ID,
  EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT,
  EMAIL_FROM,
  EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD,
} = configPrivate;

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient) as AuthOptions["adapter"],
  providers: compact([
    EmailProvider({
      // ...emailToken,
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
