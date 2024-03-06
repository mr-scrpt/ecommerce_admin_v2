import { ROLES, SessionEntity, UserId } from "@/shared/lib/user";

export const createUserAbility = (session: SessionEntity) => ({
  canCreateUser: () => true,
  canGetUser: () => session.user.role === ROLES.ADMIN,

  canRemoveUser: (userId: UserId) =>
    session.user.id !== userId && session.user.role === ROLES.ADMIN,

  canUpdateUser: () => session.user.role === ROLES.ADMIN,
});
