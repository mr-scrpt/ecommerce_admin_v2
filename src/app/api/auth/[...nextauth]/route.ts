import { nextAuthConfig } from "@/kernel/lib/nextauth/server";
import NextAuth from "next-auth/next";
// import { NextRequest } from "next/server";

// interface RouteHandlerContext {
//   params: { nextauth: string[] };
// }

// const handler = async (req: NextRequest, context: RouteHandlerContext) => {
//   return NextAuth(req, context, nextAuthConfigWithCreateUser);
// };
//
// export { handler as GET, handler as POST };

const authHandler = NextAuth(nextAuthConfig);

export { authHandler as GET, authHandler as POST };
