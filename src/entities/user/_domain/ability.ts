import { ROLES, SessionEntity, UserId } from "./types";

export const createUserAbility = (session: SessionEntity) => ({
  canGetUser: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});

export const createProfileAbility = (session: SessionEntity) => {
  console.log("output_log: canUpdateProfile =>>>", session);
  return {
    canUpdateProfile: (userId: UserId) =>
      session.user.id === userId || session.user.role === ROLES.ADMIN,
  };
};
