// import { UserEntity } from "@/entities/user/user";
// import { createUserAbility } from "@/entities/user/user.server";
// import { ForbiddenError } from "@/shared/lib/errors";
// import { SessionEntity } from "@/shared/lib/user";
// import { injectable } from "inversify";
// import { UserCreateComplexible } from "../_domain/types";
// import { UserCreateTx } from "../_tx/userCreate.transaction";
//
// type CreateUser = {
//   userToCreate: UserCreateComplexible;
//   session: SessionEntity;
// };
//
// @injectable()
// export class CreateUserUseCase {
//   constructor(private readonly userCreateTx: UserCreateTx) {}
//
//   async exec(data: CreateUser): Promise<UserEntity> {
//     const { session, userToCreate } = data;
//     const { canCreateUser } = createUserAbility(session);
//
//     if (!canCreateUser()) {
//       throw new ForbiddenError();
//     }
//
//     return await this.userCreateTx.createUser({
//       ...userToCreate,
//     });
//   }
// }
