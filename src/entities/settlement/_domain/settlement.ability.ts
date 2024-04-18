import { SessionEntity } from "@/shared/lib/user";

export const createSettlementAbility = (session: SessionEntity) => ({
  canCreateSettlement: () => !!session.user.role,

  canGetSettlement: () => !!session.user.role,

  canAddSettlement: () => !!session.user.role,

  canRemoveSettlement: () => !!session.user.role,

  canUpdateSettlement: () => !!session.user.role,
});
