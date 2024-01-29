import { useAppSession } from "./useAppSession";

export const useRole = () => {
  const session = useAppSession();
  return session?.data?.user?.role;
};
