import { injectable } from "inversify";
import { IUserUpdateTx } from "../_domain/transaction.type";
import { UserUpdateTxPayload } from "../_domain/types";
import { User } from "@/kernel/domain/user/user.type";

@injectable()
export class UserUpdateService {
  constructor(private readonly userUpdateTx: IUserUpdateTx) {}

  async execute(payload: UserUpdateTxPayload): Promise<User> {
    return await this.userUpdateTx.update(payload);
  }
}
