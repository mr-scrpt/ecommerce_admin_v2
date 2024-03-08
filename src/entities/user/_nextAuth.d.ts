// import NextAuth from "next-auth";
//
// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string;
//       email: string;
//       image?: string;
//     };
//   }
//   interface User {
//     id: string;
//     email: string;
//     name?: string;
//     image?: string;
//   }
// }
import NextAuth from "next-auth";
import { SessionEntity } from "@/shared/lib/user";
import { UserEntity } from "./_domain/user.types";

declare module "next-auth" {
  interface Session {
    user: SessionEntity["user"];
  }
  interface User extends UserEntity {}
}
