import { ROLES } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createStoreAbility = (session: SessionEntity) => ({
  canGetStore: () => true,

  canCreateStore: () => session.user.role === ROLES.ADMIN,

  canRemoveStore: () => session.user.role === ROLES.ADMIN,

  canUpdateStore: () => session.user.role === ROLES.ADMIN,
});
