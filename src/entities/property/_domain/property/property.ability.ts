import { ROLES, SessionEntity } from "@/shared/lib/user";

export const createPropertyAbility = (session: SessionEntity) => ({
  canGetProperty: () => true,

  canCreateProperty: () => session.user.role === ROLES.ADMIN,

  canRemoveProperty: () => session.user.role === ROLES.ADMIN,

  canUpdateProperty: () => session.user.role === ROLES.ADMIN,
});
