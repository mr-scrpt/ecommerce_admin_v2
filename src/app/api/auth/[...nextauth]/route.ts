import { nextAuthConfigWithCreateUser } from "@/entities/user/nextAuthConfig";
import NextAuth from "next-auth/next";

const authHandler = NextAuth(nextAuthConfigWithCreateUser());

export { authHandler as GET, authHandler as POST };
