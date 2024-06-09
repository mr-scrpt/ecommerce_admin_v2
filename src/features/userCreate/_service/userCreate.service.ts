import { UserEntity } from "@/entities/user/user";
import { ROLES } from "@/kernel/domain/role.type";
import { IUserCreateService } from "@/kernel/lib/nextauth/type";
import { configPrivate } from "@/shared/config/private.config";
import { injectable } from "inversify";
import { merge } from "lodash";
import { IUserCreateTx } from "../_domain/transaction.type";
import { UserCreateTxDTO, UserCreateTxPayload } from "./../_domain/types";

const CHAR_SPLIT = ",";

@injectable()
export class UserCreateService implements IUserCreateService {
  constructor(private readonly userCreateTx: IUserCreateTx) {}

  async execute(payload: UserCreateTxPayload): Promise<UserEntity> {
    const userCreateDTO = this.build(payload);
    return await this.userCreateTx.createUser(userCreateDTO);
  }

  private build(payload: UserCreateTxPayload): UserCreateTxDTO {
    const { userData } = payload;
    const { email, phone, name, image } = userData;

    const adminEmails = configPrivate.ADMIN_EMAILS?.split(CHAR_SPLIT) ?? [];
    const role = adminEmails.includes(email) ? ROLES.ADMIN : ROLES.USER;

    return merge({}, payload, {
      userData: {
        name: name ?? "",
        phone: phone ?? "",
        image: image ?? "",
        role,
      },
    });
  }
}
