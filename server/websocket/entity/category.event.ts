import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../../src/shared/type/websokcetEvent.enum";

export const categoryEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.CATEGORY_CREATE, (data) => {
    console.log("output_log: category created =>>>", data);
    io.emit(WSEventEnum.CATEGORY_LIST_REFRESH);
    io.emit(WSEventEnum.CATEGORY_REFRESH, data);
  });

  socket.on(WSEventEnum.CATEGORY_UPDATE, (data) => {
    console.log("output_log: category update =>>>", data);
    io.emit(WSEventEnum.CATEGORY_LIST_REFRESH);
    io.emit(WSEventEnum.CATEGORY_REFRESH, data);
  });

  socket.on(WSEventEnum.CATEGORY_REMOVE, (data) => {
    console.log("output_log: category remove =>>>", data);
    io.emit(WSEventEnum.CATEGORY_LIST_REFRESH);
    io.emit(WSEventEnum.CATEGORY_REFRESH, data);
  });
};
