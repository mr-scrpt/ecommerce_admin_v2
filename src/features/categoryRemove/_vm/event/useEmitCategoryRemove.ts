import { CategoryId } from "@/entities/category";
import { useSocket } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";

export const useEmitCategoryRemove = () => {
  const socket = useSocket();

  return {
    categoryRemoveEvent: (categoryId: CategoryId) => {
      socket.emit(WSEventEnum.CATEGORY_REMOVE, categoryId);
    },
  };
};
