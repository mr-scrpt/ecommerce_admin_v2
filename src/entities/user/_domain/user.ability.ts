import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createUserAbility = (session: SessionEntity) => ({
  canCreateUser: () => session.user.role === RoleEnum.ADMIN,
  canGetUser: () => session.user.role === RoleEnum.ADMIN,

  canRemoveUser: (userId: string) =>
    session.user.id !== userId && session.user.role === RoleEnum.ADMIN,

  canUpdateUser: () => session.user.role === RoleEnum.ADMIN,
});
