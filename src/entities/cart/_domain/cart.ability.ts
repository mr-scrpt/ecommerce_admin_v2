import { SessionEntity } from "@/shared/lib/user";

export const createCartAbility = (session: SessionEntity) => ({
  canGetCart: () => !!session.user.role,

  canAddProduct: () => !!session.user.role,

  canRemoveProduct: () => !!session.user.role,
});
