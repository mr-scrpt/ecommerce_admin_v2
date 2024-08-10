import { SessionEntity } from "@/kernel/domain/session.type";

export const createCartAbility = (session: SessionEntity) => ({
  canGetCart: () => !!session.user.role,

  canAddProduct: () => !!session.user.role,

  canRemoveProduct: () => !!session.user.role,

  canChangeProduct: () => !!session.user.role,
});
