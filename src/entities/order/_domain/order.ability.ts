import { SessionEntity } from "@/kernel/domain/session.type";

export const createOrderAbility = (session: SessionEntity) => ({
  canCreateOrder: () => !!session.user.role,

  canGetOrder: () => !!session.user.role,

  canAddToOrder: () => !!session.user.role,

  canRemoveFromOrder: () => !!session.user.role,

  canUpdateOrder: () => !!session.user.role,
});
