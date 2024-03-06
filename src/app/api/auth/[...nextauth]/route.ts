import { nextAuthConfigWithCreateUser } from "@/features/userCreate/server";
import NextAuth from "next-auth/next";

const authHandler = NextAuth(nextAuthConfigWithCreateUser());

export { authHandler as GET, authHandler as POST };
