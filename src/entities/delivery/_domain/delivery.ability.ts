import { SessionEntity } from "@/shared/lib/user";

export const createDeliveryAbility = (session: SessionEntity) => ({
  canCreateDelivery: () => !!session.user.role,

  canGetDelivery: () => !!session.user.role,

  canAddDelivery: () => !!session.user.role,

  canRemoveDelivery: () => !!session.user.role,

  canUpdateDelivery: () => !!session.user.role,
});
