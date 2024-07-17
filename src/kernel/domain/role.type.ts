import { ROLE as RoleEnum } from "@prisma/client";
const RoleStaff: RoleEnum[] = [RoleEnum.MANAGER, RoleEnum.ADMIN];

export { RoleEnum, RoleStaff };
