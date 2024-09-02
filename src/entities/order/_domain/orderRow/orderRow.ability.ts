import { SessionEntity } from "@/kernel/domain/session.type";

export const createOrderRowAbility = (session: SessionEntity) => ({
  canCreateOrderRow: () => !!session.user.role,

  canGetOrderRow: () => !!session.user.role,

  canRemoveOrderRow: () => !!session.user.role,
});
