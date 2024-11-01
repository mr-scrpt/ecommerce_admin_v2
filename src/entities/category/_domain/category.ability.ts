import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";
import { ForbiddenError, UnauthorizedError } from "@/kernel/error/error.common";
import { ZodAny } from "zod";

// export const createCategoryAbility = (session: SessionEntity) => ({
//   canGetCategory: () => true,
//
//   canCreateCategory: () => session.user.role === RoleEnum.ADMIN,
//
//   canRemoveCategory: () => session.user.role === RoleEnum.ADMIN,
//
//   canUpdateCategory: () => session.user.role === RoleEnum.ADMIN,
// });
export const createCategoryAbility = (session: SessionEntity) => ({
  canGetCategory: () => {
    // Допустим, все могут получать категорию
    return true;
  },
  canCreateCategory: () => {
    if (session.user.role !== RoleEnum.ADMIN) {
      throw new ForbiddenError("Недостаточно прав для создания категории");
    }
    return true;
  },
  canRemoveCategory: () => {
    if (session.user.role !== RoleEnum.ADMIN) {
      throw new ForbiddenError("Недостаточно прав для удаления категории");
    }
    return true;
  },
  canUpdateCategory: () => {
    if (session.user.role !== RoleEnum.ADMIN) {
      throw new ForbiddenError("Недостаточно прав для обновления категории");
    }
    return true;
  },
});
