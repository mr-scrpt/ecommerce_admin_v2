import { SessionEntity } from "@/kernel/domain/session.type";

export const createDeliveryAbility = (session: SessionEntity) => ({
  canCreateDelivery: () => !!session.user.role,

  canGetDelivery: () => !!session.user.role,

  canAddDelivery: () => !!session.user.role,

  canRemoveDelivery: () => !!session.user.role,

  canUpdateDelivery: () => !!session.user.role,
});
