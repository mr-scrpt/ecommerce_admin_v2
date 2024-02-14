import { ROLES, SessionEntity } from "@/shared/lib/user";

export const createProductAbility = (session: SessionEntity) => ({
  canGetProduct: () => true,

  canCreateProduct: () => session.user.role === ROLES.ADMIN,

  canRemoveProduct: () => session.user.role === ROLES.ADMIN,

  canUpdateProduct: () => session.user.role === ROLES.ADMIN,
});
