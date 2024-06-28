import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createPropertyItemAbility = (session: SessionEntity) => ({
  canGetPropertyItem: () => true,

  canCreatePropertyItem: () => session.user.role === RoleEnum.ADMIN,

  canRemovePropertyItem: () => session.user.role === RoleEnum.ADMIN,

  canUpdatePropertyItem: () => session.user.role === RoleEnum.ADMIN,
});
