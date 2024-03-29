import { CategoryId } from "@/entities/category";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitCategoryUpdate = () => {
  const socket = useSocket();

  return {
    categoryUpdateEvent: (categoryId: CategoryId) => {
      socket.emit(WSEventEnum.CATEGORY_UPDATE, categoryId);
    },
  };
};
