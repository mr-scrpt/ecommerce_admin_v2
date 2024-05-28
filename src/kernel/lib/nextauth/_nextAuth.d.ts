import NextAuth from "next-auth";
import { SessionEntity } from "@/kernel/domain/session.type";
import { UserEntity } from "@/kernel/domain/user.type";
import { ClientNetworkData } from "../../../entities/session/types";

declare module "next-auth" {
  interface Session {
    user: SessionEntity["user"];
    clientNetworkData: ClientNetworkData;
  }
  interface User extends UserEntity {}
}
