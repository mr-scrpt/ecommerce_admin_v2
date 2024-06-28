import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createProfileAbility = (session: SessionEntity) => ({
  canGetProfile: (userId: string) => true,

  canUpdateProfile: (userId: string) =>
    session.user.id === userId || session.user.role === RoleEnum.ADMIN,
});
