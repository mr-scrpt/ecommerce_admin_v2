import { ROUTING_MAIN_MENU_DATA } from "@/shared/config/routing.config";
import { useAppSession } from "@/kernel/lib/nextauth";

export const useMenu = () => {
  const { data } = useAppSession();
  return ROUTING_MAIN_MENU_DATA.filter((item) =>
    item.role ? item.role.includes(data?.user.role) && item : item,
  );
};
