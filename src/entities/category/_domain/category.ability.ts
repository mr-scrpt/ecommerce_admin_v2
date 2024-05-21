import { ROLES } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createCategoryAbility = (session: SessionEntity) => ({
  canGetCategory: () => true,

  canCreateCategory: () => session.user.role === ROLES.ADMIN,

  canRemoveCategory: () => session.user.role === ROLES.ADMIN,

  canUpdateCategory: () => session.user.role === ROLES.ADMIN,
});
