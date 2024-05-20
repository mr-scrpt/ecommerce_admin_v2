import { ROLE as ROLES } from "@prisma/client";
export type Role = (typeof ROLES)[keyof typeof ROLES];
export { ROLES };
