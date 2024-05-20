"use server";
import { getServerSession } from "next-auth";
import { NeedAuthError } from "@/shared/lib/errors";
import { redirect } from "next/navigation";
import { nextAuthConfig } from "./nextAuthConfig";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);

export const getAppSessionStrictServer = async () => {
  const session = await getAppSessionServer();

  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};

export const getAppSessionServerOrRedirect = async () => {
  const session = await getAppSessionServer();
  if (!session) {
    return redirect("/auth/sign-in");
  }
  return session;
};
