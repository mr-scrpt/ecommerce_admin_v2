"use server";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "../nextAuthConfig";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);
