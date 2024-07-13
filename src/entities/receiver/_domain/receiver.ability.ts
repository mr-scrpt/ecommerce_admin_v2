import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createReceiverAbility = (session: SessionEntity) => ({
  canGetReceiver: () => true,

  canCreateReceiver: () => session.user.role === RoleEnum.ADMIN,

  canRemoveReceiver: () => session.user.role === RoleEnum.ADMIN,

  canUpdateReceiver: () => session.user.role === RoleEnum.ADMIN,
});
