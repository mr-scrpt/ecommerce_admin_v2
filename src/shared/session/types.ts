import { injectable } from "inversify";
import { AdapterUser } from "next-auth/adapters";
import { Role } from "../lib/user";
import { UserEntity } from "@/entities/user/user";

export type ClientNetworkData = {
  ip: string;
  country: string;
  country_name: string;
  country_code: string;
  city: string;
  timezone: string;
};

export type UserToCreate = {
  email: string;
  phone: string;
  name?: string | null;
  image?: string | null;
  role: Role;
};

@injectable()
export abstract class CreateUserService {
  abstract exec(data: UserToCreate): Promise<UserEntity>;
}
