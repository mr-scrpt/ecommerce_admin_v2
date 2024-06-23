import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitCategoryRemove = () => {
  const socket = useSocket();

  return {
    categoryRemoveEvent: (categoryId: string) => {
      socket.emit(WSEventEnum.CATEGORY_REMOVE, categoryId);
    },
  };
};
