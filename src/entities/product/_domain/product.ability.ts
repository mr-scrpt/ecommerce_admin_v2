import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createProductAbility = (session: SessionEntity) => ({
  canGetProduct: () => true,

  canCreateProduct: () => session.user.role === RoleEnum.ADMIN,

  canRemoveProduct: () => session.user.role === RoleEnum.ADMIN,

  canUpdateProduct: () => session.user.role === RoleEnum.ADMIN,
});
