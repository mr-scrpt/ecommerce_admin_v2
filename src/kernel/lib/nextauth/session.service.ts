import { UnauthorizedError } from "@/kernel/error/error.common";
import { injectable } from "inversify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextAuthConfig } from "./nextAuthConfig";

@injectable()
export class SessionService {
  constructor(private readonly nextAuthConfig: NextAuthConfig) {}

  async get() {
    return await getServerSession(this.nextAuthConfig.options);
  }

  async getStrict() {
    const session = await this.get();

    if (session === null) {
      throw new UnauthorizedError();
    }

    return session;
  }

  async getOrRedirect() {
    const session = await this.get();
    if (!session) {
      return redirect("/auth/sign-in");
    }
    return session;
  }
}
