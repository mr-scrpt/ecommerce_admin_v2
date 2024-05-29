import { Role } from "@/kernel/domain/role.type";
import { UserEntity } from "@/kernel/domain/user.type";
import { injectable } from "inversify";
import { Session } from "next-auth";

type UserCreatePayloadAbastract = {
  email: string;
  phone: string;
  name?: string | null;
  image?: string | null;
  role: Role;
};

// NOTE: Payload
type SessionWithDataPayloadAbastract = {
  session: Session;
  userId: string;
};

@injectable()
export abstract class UserCreateServiceAbstract {
  abstract execute(payload: UserCreatePayloadAbastract): Promise<UserEntity>;
}

@injectable()
export abstract class SessionGetRelationServiceAbstract {
  abstract execute(payload: SessionWithDataPayloadAbastract): Promise<Session>;
}
