import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createStoreAbility = (session: SessionEntity) => ({
  canGetStore: () => true,

  canCreateStore: () => session.user.role === RoleEnum.ADMIN,

  canRemoveStore: () => session.user.role === RoleEnum.ADMIN,

  canUpdateStore: () => session.user.role === RoleEnum.ADMIN,
});
