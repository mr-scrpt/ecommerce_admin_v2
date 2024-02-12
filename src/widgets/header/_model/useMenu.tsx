import { useAppSession } from "@/entities/user/session";
import { ROUTING_MAIN_MENU_DATA } from "@/shared/config/routing.config";

export const useMenu = () => {
  const { data } = useAppSession();
  return ROUTING_MAIN_MENU_DATA.filter((item) =>
    item.role ? item.role.includes(data?.user.role) && item : item,
  );
};
