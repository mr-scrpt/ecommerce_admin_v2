import { RoleEnum } from "@/kernel/domain/role.type";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { Session } from "next-auth";

// NOTE: Payload
export type UserCreatePayload = {
  name?: string | null;
  lastName?: string | null;
  email: string;
  phone: string;
  image?: string | null;
  // role: Role;
};

export type UserCreateTxPayload = {
  userData: UserCreatePayload;
};

export type UserCreateDTO = {
  data: {
    name?: string | null;
    lastName?: string | null;
    email: string;
    phone: string;
    image?: string | null;
    role: RoleEnum;
  };
};

export type UserCreateTxDTO = {
  userData: UserCreateDTO["data"];
};

// NOTE: Payload
type SessionWithDataPayloadAbastract = {
  session: Session;
  userId: string;
};

// @injectable()
export abstract class IUserCreateService {
  abstract execute(payload: UserCreateTxPayload): Promise<UserEntity>;
}

// @injectable()
export abstract class ISessionGetRelationService {
  abstract execute(payload: SessionWithDataPayloadAbastract): Promise<Session>;
}
