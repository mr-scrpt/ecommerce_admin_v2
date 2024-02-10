import { ROLES, SessionEntity } from "@/shared/lib/user";

export const createCategoryAbility = (session: SessionEntity) => ({
  canGetCategory: () => true,

  canRemoveCategory: () => session.user.role === ROLES.ADMIN,

  canUpdateCategory: () => session.user.role === ROLES.ADMIN,
});
