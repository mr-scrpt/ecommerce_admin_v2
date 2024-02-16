import { ROLES, SessionEntity } from "@/shared/lib/user";

export const createOptionAbility = (session: SessionEntity) => ({
  canGetOption: () => true,

  canCreateOption: () => session.user.role === ROLES.ADMIN,

  canRemoveOption: () => session.user.role === ROLES.ADMIN,

  canUpdateOption: () => session.user.role === ROLES.ADMIN,
});
