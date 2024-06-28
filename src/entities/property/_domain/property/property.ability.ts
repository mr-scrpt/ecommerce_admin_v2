import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createPropertyAbility = (session: SessionEntity) => ({
  canGetProperty: () => true,

  canCreateProperty: () => session.user.role === RoleEnum.ADMIN,

  canRemoveProperty: () => session.user.role === RoleEnum.ADMIN,

  canUpdateProperty: () => session.user.role === RoleEnum.ADMIN,
});
