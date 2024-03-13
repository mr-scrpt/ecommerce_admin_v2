import { SessionEntity } from "@/shared/lib/user";

export const createOrderAbility = (session: SessionEntity) => ({
  canGetOrder: () => !!session.user.role,

  canAddProduct: () => !!session.user.role,

  canRemoveProduct: () => !!session.user.role,

  canChangeProduct: () => !!session.user.role,
});
