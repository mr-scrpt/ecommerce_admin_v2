import { ROLES } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createUserAbility = (session: SessionEntity) => ({
  canCreateUser: () => true,
  canGetUser: () => session.user.role === ROLES.ADMIN,

  canRemoveUser: (userId: string) =>
    session.user.id !== userId && session.user.role === ROLES.ADMIN,

  canUpdateUser: () => session.user.role === ROLES.ADMIN,
});
