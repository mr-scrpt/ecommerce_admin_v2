import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createConsumerAbility = (session: SessionEntity) => ({
  canCreateConsumer: () => session.user.role === RoleEnum.ADMIN,
  canGetConsumer: () => session.user.role === RoleEnum.ADMIN,

  canRemoveConsumer: () => session.user.role === RoleEnum.ADMIN,

  canUpdateConsumer: () => session.user.role === RoleEnum.ADMIN,
});
