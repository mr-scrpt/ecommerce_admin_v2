import { SessionEntity } from "@/shared/lib/user";

export const createOrderAbility = (session: SessionEntity) => ({
  canGetOrder: () => !!session.user.role,

  canAddOrder: () => !!session.user.role,

  canRemoveOrder: () => !!session.user.role,

  canUpdateOrder: () => !!session.user.role,
});
