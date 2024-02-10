import { ROLES, SessionEntity } from "@/shared/lib/user";

export const createCategoryAbility = (session: SessionEntity) => ({
  canGetCategory: () => true,

  canCreateCategory: () => session.user.role === ROLES.ADMIN,

  canRemoveCategory: () => session.user.role === ROLES.ADMIN,

  canUpdateCategory: () => session.user.role === ROLES.ADMIN,
});
