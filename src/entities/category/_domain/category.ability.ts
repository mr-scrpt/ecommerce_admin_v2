import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createCategoryAbility = (session: SessionEntity) => ({
  canGetCategory: () => true,

  canCreateCategory: () => session.user.role === RoleEnum.ADMIN,

  canRemoveCategory: () => session.user.role === RoleEnum.ADMIN,

  canUpdateCategory: () => session.user.role === RoleEnum.ADMIN,
});
