import { Role } from "@/kernel/domain/role.type";
import { UserEntity } from "@/kernel/domain/user.type";
import { injectable } from "inversify";
import { Session } from "next-auth";

// NOTE: Payload
export type UserCreatePayload = {
  email: string;
  phone: string;
  name?: string | null;
  image?: string | null;
  // role: Role;
};

export type UserCreateTxPayload = {
  userData: UserCreatePayload;
};

export type UserCreateDTO = {
  data: {
    email: string;
    phone: string;
    name?: string | null;
    image?: string | null;
    role: Role;
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

@injectable()
export abstract class IUserCreateService {
  abstract execute(payload: UserCreateTxPayload): Promise<UserEntity>;
}

@injectable()
export abstract class ISessionGetRelationService {
  abstract execute(payload: SessionWithDataPayloadAbastract): Promise<Session>;
}
