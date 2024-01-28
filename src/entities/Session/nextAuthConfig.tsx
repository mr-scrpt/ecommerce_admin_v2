import { configPrivate } from "@/shared/config/private.config";
import { dbClient } from "@/shared/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compact } from "lodash-es";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const { GITHUB_SECRET, GITHUB_ID } = configPrivate;

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient) as AuthOptions["adapter"],
  providers: compact([
    GITHUB_ID &&
      GITHUB_SECRET &&
      GithubProvider({
        clientId: GITHUB_ID ?? "",
        clientSecret: GITHUB_SECRET ?? "",
      }),
  ]),
};
