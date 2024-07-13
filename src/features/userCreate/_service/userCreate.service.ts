import { IUserCreateService } from "@/kernel/lib/nextauth/type";
import { configPrivate } from "@/shared/config/private.config";
import { injectable } from "inversify";
import { merge } from "lodash";
import { IUserCreateTx } from "../_domain/transaction.type";
import { UserCreateTxDTO, UserCreateTxPayload } from "../_domain/types";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { RoleEnum } from "@/kernel/domain/role.type";

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
    const { email, phone, name, lastName, image } = userData;

    const adminEmails = configPrivate.ADMIN_EMAILS?.split(CHAR_SPLIT) ?? [];
    const role = adminEmails.includes(email)
      ? RoleEnum.ADMIN
      : RoleEnum.CONSUMER;

    const [fistName, receivedLatName] = name?.split(" ") ?? [];

    return merge({}, payload, {
      userData: {
        name: fistName ?? "",
        lastName: lastName ?? receivedLatName ?? "",
        phone: phone ?? "",
        image: image ?? "",
        role,
      },
    });
  }
}
