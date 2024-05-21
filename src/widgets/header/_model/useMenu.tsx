import { useAppSession } from "@/kernel/lib/nextauth";
import { ROUTING_MAIN_MENU_DATA } from "@/kernel/config/routing.config";

export const useMenu = () => {
  const { data } = useAppSession();
  return ROUTING_MAIN_MENU_DATA.filter((item) => item);
};
// item.role ? item.role.includes(data?.user.role) && item : item,
