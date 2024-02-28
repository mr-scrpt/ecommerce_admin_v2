import { ROLES, SessionEntity } from "@/shared/lib/user";

export const createPropertyItemAbility = (session: SessionEntity) => ({
  canGetPropertyItem: () => true,

  canCreatePropertyItem: () => session.user.role === ROLES.ADMIN,

  canRemovePropertyItem: () => session.user.role === ROLES.ADMIN,

  canUpdatePropertyItem: () => session.user.role === ROLES.ADMIN,
});
