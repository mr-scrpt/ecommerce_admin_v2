import { getServerSession } from "next-auth";
import { NextAuthConfig } from "./nextAuthConfig";
import { injectable } from "inversify";
import { NeedAuthError } from "../lib/errors";
import { redirect } from "next/navigation";

@injectable()
export class SessionService {
  constructor(private readonly nextAuthConfig: NextAuthConfig) {}

  async get() {
    return await getServerSession(this.nextAuthConfig.options);
  }

  async getStrict() {
    const session = await this.get();

    if (session === null) {
      throw new NeedAuthError();
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
