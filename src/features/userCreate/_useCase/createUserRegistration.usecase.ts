import { UserCreateTx } from "../_tx/userCreate.transaction";
import { injectable } from "inversify";
import { configPrivate } from "@/shared/config/private.config";
import { ROLES } from "@/kernel/domain/role.type";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { UserCreateDTO } from "@/entities/user/user";

@injectable()
export class CreateUserRegistrationUseCase {
  constructor(private readonly userCreateTx: UserCreateTx) {}

  async exec(dto: UserCreateDTO): Promise<UserEntity> {
    const { data } = dto;
    const adminEmails = configPrivate.ADMIN_EMAILS?.split(",") ?? [];
    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER;

    const user: UserCreateDTO = {
      ...dto,
      role,
    };

    return await this.userCreateTx.createUser(user);
  }
}
