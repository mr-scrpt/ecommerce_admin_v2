import { ROLES, SessionEntity, UserId } from "./types";

export const createProfileAbility = (session: SessionEntity) => ({
  canUpdateProfile: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
