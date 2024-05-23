import { UserToCreate } from "@/entities/user/_domain/user.types";
import { UserCreateTx } from "../_tx/userCreate.transaction";
import { injectable } from "inversify";
import { UserEntity } from "@/entities/user/user";
import { configPrivate } from "@/shared/config/private.config";
import { ROLES } from "@/kernel/domain/role.type";

@injectable()
export class CreateUserRegistrationUseCase {
  constructor(private readonly userCreateTx: UserCreateTx) {}

  async exec(data: UserToCreate): Promise<UserEntity> {
    const adminEmails = configPrivate.ADMIN_EMAILS?.split(",") ?? [];
    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER;

    const user: UserToCreate = {
      ...data,
      role,
    };

    return await this.userCreateTx.createUser(user);
  }
}
