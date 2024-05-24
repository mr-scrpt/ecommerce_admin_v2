import { UserToCreate } from "@/entities/user/user.server";
import { ROLES } from "@/kernel/domain/role.type";
import { configPrivate } from "@/shared/config/private.config";
import { injectable } from "inversify";
import { UserCreateTx } from "../_tx/userCreate.transaction";
import { UserCreateServiceAbstract } from "@/kernel/lib/nextauth/type";
import { UserEntity } from "@/entities/user/user";

@injectable()
export class UserCreateService implements UserCreateServiceAbstract {
  constructor(private readonly userCreateTx: UserCreateTx) {}

  async execute(props: UserToCreate): Promise<UserEntity> {
    const adminEmails = configPrivate.ADMIN_EMAILS?.split(",") ?? [];
    const role = adminEmails.includes(props.email) ? ROLES.ADMIN : ROLES.USER;

    const user: UserToCreate = {
      ...props,
      role,
    };

    return await this.userCreateTx.createUser(user);
  }
}
