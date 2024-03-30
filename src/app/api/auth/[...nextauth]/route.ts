import { nextAuthConfigWithCreateUser } from "@/features/userCreate/server";
import NextAuth from "next-auth/next";
import { NextRequest } from "next/server";

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  return NextAuth(req, context, nextAuthConfigWithCreateUser);
};

export { handler as GET, handler as POST };
