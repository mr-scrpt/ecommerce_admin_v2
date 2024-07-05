import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createAddressAbility = (session: SessionEntity) => ({
  canGetAddress: () => true,

  canCreateAddress: () => session.user.role === RoleEnum.ADMIN,

  canRemoveAddress: () => session.user.role === RoleEnum.ADMIN,

  canUpdateAddress: () => session.user.role === RoleEnum.ADMIN,
});
