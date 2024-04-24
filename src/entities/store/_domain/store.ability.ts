import { ROLES, SessionEntity } from "@/shared/lib/user";

export const createStoreAbility = (session: SessionEntity) => ({
  canGetStore: () => true,

  canCreateStore: () => session.user.role === ROLES.ADMIN,

  canRemoveStore: () => session.user.role === ROLES.ADMIN,

  canUpdateStore: () => session.user.role === ROLES.ADMIN,
});
