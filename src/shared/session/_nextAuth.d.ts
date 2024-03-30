import NextAuth from "next-auth";
import { SessionEntity } from "@/shared/lib/user";
import { UserEntity } from "../../entities/user/_domain/user.types";
import { ClientNetworkData } from "./types";

declare module "next-auth" {
  interface Session {
    user: SessionEntity["user"];
    clientNetworkData: ClientNetworkData;
  }
  interface User extends UserEntity {}
}
