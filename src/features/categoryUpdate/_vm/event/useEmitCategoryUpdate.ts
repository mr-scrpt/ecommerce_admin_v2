import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitCategoryUpdate = () => {
  const socket = useSocket();

  return {
    categoryUpdateEvent: (categoryId: string) => {
      socket.emit(WSEventEnum.CATEGORY_UPDATE, categoryId);
    },
  };
};
