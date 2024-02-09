import { configPrivate } from "@/shared/config/private.config";
import { createId } from "@/shared/lib/id";
import { UserEntity } from "../_domain/types";
import { UserRepository, userRepository } from "../_repository/user.repo";
import { ROLES } from "@/shared/lib/user";

type CreateUser = {
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
};

class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: CreateUser) {
    const adminEmails = configPrivate.ADMIN_EMAILS?.split(",") ?? [];
    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER;

    const user: UserEntity = {
      id: createId(),
      role,
      ...data,
    };

    return await this.userRepo.createUser(user);
  }
}

export const createUserUseCase = new CreateUserUseCase(userRepository);
