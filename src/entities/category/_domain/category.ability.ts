import { RoleEnum } from "@/kernel/domain/role.type";
import { SessionEntity } from "@/kernel/domain/session.type";
import { ForbiddenError } from "@/kernel/error/errors/error.common";
import { ERROR_APP_LAYER } from "@/shared/error/type";
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
      throw new ForbiddenError({ layer: ERROR_APP_LAYER.SERVICE });
    }
    return true;
  },
  canRemoveCategory: () => {
    if (session.user.role !== RoleEnum.ADMIN) {
      throw new ForbiddenError({ layer: ERROR_APP_LAYER.SERVICE });
    }
    return true;
  },
  canUpdateCategory: () => {
    if (session.user.role !== RoleEnum.ADMIN) {
      throw new ForbiddenError({ layer: ERROR_APP_LAYER.SERVICE });
    }
    return true;
  },
});
