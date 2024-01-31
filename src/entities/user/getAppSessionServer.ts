"use server";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./nextAuthConfig";
import { NeedAuthError } from "@/shared/lib/errors";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);

export const getAppSessionStrictServer = async () => {
  const session = await getAppSessionServer();
  console.log("output_log:  =>>>", session);
  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};
