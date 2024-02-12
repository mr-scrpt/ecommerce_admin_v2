import { userRepository } from "../_repository/user.repo";

import { configPrivate } from "@/shared/config/private.config";
import { ROLES } from "@/shared/lib/user";
import { UserEntity, UserToCreate } from "../_domain/types";
import { UserRepository } from "../_repository/user.repo";

export type CreateUser = {
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
};

export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: CreateUser): Promise<UserEntity> {
    const adminEmails = configPrivate.ADMIN_EMAILS?.split(",") ?? [];
    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER;

    const user: UserToCreate = {
      // id: createId(),
      role,
      ...data,
    };

    return await this.userRepo.createUser(user);
  }
}

export const createUserUseCase = new CreateUserUseCase(userRepository);
