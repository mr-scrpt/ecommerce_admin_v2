import { User } from "../_domain/user.types";
import { useUserQuery } from "../_query/user.query";

export const useGetUserWithOrdersInfo = async (id: string) => {
  const user = useUserQuery(id);
};
