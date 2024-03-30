import { User } from "../_domain/user.types";
import { useUserQuery } from "../_query/user.query";

export const getUserInfo = async (id: string) => {
  const user = await useUserQuery(id);
};
