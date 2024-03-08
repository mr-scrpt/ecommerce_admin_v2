import NextAuth from "next-auth";
import { SessionEntity } from "@/shared/lib/user";
import { UserEntity } from "./_domain/user.types";

declare module "next-auth" {
  interface Session {
    user: SessionEntity["user"];
  }
  interface User extends UserEntity {}
}
