import { ROLES } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createPropertyAbility = (session: SessionEntity) => ({
  canGetProperty: () => true,

  canCreateProperty: () => session.user.role === ROLES.ADMIN,

  canRemoveProperty: () => session.user.role === ROLES.ADMIN,

  canUpdateProperty: () => session.user.role === ROLES.ADMIN,
});
