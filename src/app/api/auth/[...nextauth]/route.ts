import { nextAuthConfigWithCreateUser } from "@/features/userCreate/server";
import { getCookie } from "cookies-next";
import NextAuth from "next-auth/next";
import { headers } from "next/headers";
import { NextRequest, userAgent } from "next/server";

// const authHandler = NextAuth(nextAuthConfigWithCreateUser);
//
// export { authHandler as GET, authHandler as POST };

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  // const cookies = req.cookies;
  // console.log("output_log:  =>>>", cookies.get("userClientData"));
  // console.log("output_log: getCookie =>>>", getCookie("userClientData"));
  // const url = req.nextUrl;
  // const FALLBACK_IP_ADDRESS = "0.0.0.0";
  // const forwardedFor = headers().get("x-forwarded-for");
  //
  // if (forwardedFor) {
  //   console.log(
  //     "output_log: forwardedFor =>>>",
  //     forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS,
  //   );
  // }
  //
  // const ip = headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
  // console.log("output_log:  ip =>>>", ip);

  return NextAuth(req, context, nextAuthConfigWithCreateUser);
};

export { handler as GET, handler as POST };
