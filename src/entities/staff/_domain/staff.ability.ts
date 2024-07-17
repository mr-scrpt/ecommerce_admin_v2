import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";

export const createStaffAbility = (session: SessionEntity) => ({
  canCreateStaff: () => session.user.role === RoleEnum.ADMIN,
  canGetStaff: () => session.user.role === RoleEnum.ADMIN,

  canRemoveStaff: () => session.user.role === RoleEnum.ADMIN,

  canUpdateStaff: () => session.user.role === RoleEnum.ADMIN,
});
