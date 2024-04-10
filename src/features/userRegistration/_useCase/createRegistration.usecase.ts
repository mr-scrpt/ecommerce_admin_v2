import {
  UserDummyEntity,
  UserToRegistration,
} from "@/entities/user/_domain/user.types";
import { configPrivate } from "@/shared/config/private.config";
import { ROLES } from "@/shared/lib/user";
import { injectable } from "inversify";
import { UserRegistrationTx } from "../_tx/userRegistration.transaction";

@injectable()
export class RegistrationUserUseCase {
  constructor(private readonly userRegistrationTx: UserRegistrationTx) {}

  async exec(data: UserToRegistration): Promise<UserDummyEntity> {
    const adminEmails = configPrivate.ADMIN_EMAILS?.split(",") ?? [];
    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER;

    const user: UserToRegistration = {
      ...data,
      role,
    };

    return await this.userRegistrationTx.createUserRegistration(user);
  }
}
