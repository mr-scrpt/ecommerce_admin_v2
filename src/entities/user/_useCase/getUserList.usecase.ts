// import { AuthorizatoinError } from "@/shared/lib/errors";
// import { SessionEntity } from "@/shared/lib/user";
// import { createUserAbility } from "../_domain/user.ability";
// import { UserEntity } from "../_domain/user.types";
// import { UserRepository } from "../_repository/user.repo";
// import { injectable } from "inversify";
//
// type GetUserList = {
//   session: SessionEntity;
// };
//
// @injectable()
// export class GetUserListUseCase {
//   constructor(private readonly userRepo: UserRepository) {}
//
//   async exec(data: GetUserList): Promise<UserEntity[]> {
//     const { session } = data;
//     const { canGetUser } = createUserAbility(session);
//
//     if (!canGetUser()) {
//       throw new AuthorizatoinError();
//     }
//
//     return await this.userRepo.getUserList();
//   }
// }
