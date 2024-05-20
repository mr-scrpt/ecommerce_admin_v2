import { appModule } from "@/app/module";
import { NextAuthConfig } from "@/kernel/lib/nextauth/nextAuthConfig";
import NextAuth from "next-auth/next";

const handler = NextAuth(appModule.get(NextAuthConfig).options);

export { handler as GET, handler as POST };
