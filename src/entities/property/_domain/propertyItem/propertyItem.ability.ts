import { ROLES } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createPropertyItemAbility = (session: SessionEntity) => ({
  canGetPropertyItem: () => true,

  canCreatePropertyItem: () => session.user.role === ROLES.ADMIN,

  canRemovePropertyItem: () => session.user.role === ROLES.ADMIN,

  canUpdatePropertyItem: () => session.user.role === ROLES.ADMIN,
});
