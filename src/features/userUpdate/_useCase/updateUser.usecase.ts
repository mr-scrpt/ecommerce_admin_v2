// import { UserEntity } from "@/entities/user/user";
// import { UserToUpdate, createUserAbility } from "@/entities/user/user.server";
// import { ForbiddenError } from "@/shared/lib/errors";
// import { SessionEntity, UserId } from "@/shared/lib/user";
// import { injectable } from "inversify";
// import { UserUpdateTx } from "../_tx/userUpdate.transaction";
//
// type UpdateUser = {
//   userId: UserId;
//   userData: UserToUpdate;
//   session: SessionEntity;
// };
//
// @injectable()
// export class UpdateUserUseCase {
//   constructor(private readonly userUpdateTx: UserUpdateTx) {}
//
//   async exec(data: UpdateUser): Promise<UserEntity> {
//     const { userId, userData, session } = data;
//     const { canUpdateUser } = createUserAbility(session);
//
//     if (!canUpdateUser()) {
//       throw new ForbiddenError();
//     }
//
//     return await this.userUpdateTx.updateUser({ userId, userData });
//   }
// }
