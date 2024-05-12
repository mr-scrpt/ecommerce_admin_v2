// import { nextAuthConfigWithCreateUser } from "@/features/userCreate/server";
import { initModule } from "@/app/module";
import { NextAuthConfig } from "@/shared/session/nextAuthConfig";
import NextAuth from "next-auth/next";
import { NextRequest } from "next/server";

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  return NextAuth(req, context, initModule.get(NextAuthConfig).options);
};

export { handler as GET, handler as POST };
