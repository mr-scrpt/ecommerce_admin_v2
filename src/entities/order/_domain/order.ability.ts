import { SessionEntity } from "@/shared/lib/user";

export const createOrderAbility = (session: SessionEntity) => ({
  canCreateOrder: () => !!session.user.role,

  canGetOrder: () => !!session.user.role,

  canAddOrder: () => !!session.user.role,

  canRemoveOrder: () => !!session.user.role,

  canUpdateOrder: () => !!session.user.role,
});
