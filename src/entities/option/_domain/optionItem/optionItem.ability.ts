import { ROLES, SessionEntity } from "@/shared/lib/user";

export const createOptionItemAbility = (session: SessionEntity) => ({
  canGetOptionItem: () => true,

  canCreateOptionItem: () => session.user.role === ROLES.ADMIN,

  canRemoveOptionItem: () => session.user.role === ROLES.ADMIN,

  canUpdateOptionItem: () => session.user.role === ROLES.ADMIN,
});
