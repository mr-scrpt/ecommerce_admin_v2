import { Role } from "@/kernel/domain/role.type";
import { UserEntity } from "@/kernel/domain/user.type";
import { injectable } from "inversify";

type UserToCreate = {
  email: string;
  phone: string;
  name?: string | null;
  image?: string | null;
  role: Role;
};

@injectable()
export abstract class UserCreateServiceAbstract {
  abstract execute(data: UserToCreate): Promise<UserEntity>;
}
