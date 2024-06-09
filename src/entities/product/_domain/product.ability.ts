import { ROLES } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createProductAbility = (session: SessionEntity) => ({
  canGetProduct: () => true,

  canCreateProduct: () => session.user.role === ROLES.ADMIN,

  canRemoveProduct: () => session.user.role === ROLES.ADMIN,

  canUpdateProduct: () => session.user.role === ROLES.ADMIN,
});
