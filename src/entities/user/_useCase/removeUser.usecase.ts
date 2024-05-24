// import { ForbiddenError } from "@/shared/lib/errors";
// import { UserRepository } from "../_repository/user.repo";
// import { SessionEntity, UserId } from "@/shared/lib/user";
// import { UserEntity } from "../_domain/user.types";
// import { createUserAbility } from "../_domain/user.ability";
// import { injectable } from "inversify";
//
// type RemoveUser = {
//   userId: UserId;
//   session: SessionEntity;
// };
//
// @injectable()
// export class RemoveUserUseCase {
//   constructor(private readonly userRepo: UserRepository) {}
//
//   async exec(data: RemoveUser): Promise<UserEntity> {
//     const { userId, session } = data;
//     const { canRemoveUser } = createUserAbility(session);
//
//     if (!canRemoveUser(userId)) {
//       throw new ForbiddenError();
//     }
//
//     return await this.userRepo.removeUserById(userId);
//   }
// }
