import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../src/shared/type/websokcetEvent.enum";

export const optionEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.OPTION_CREATE, (data) => {
    console.log("output_log: option created =>>>", data);
    io.emit(WSEventEnum.OPTION_LIST_REFRESH);
    io.emit(WSEventEnum.OPTION_REFRESH, data);
  });

  socket.on(WSEventEnum.OPTION_UPDATE, (data) => {
    console.log("output_log: option update =>>>", data);
    io.emit(WSEventEnum.OPTION_LIST_REFRESH);
    io.emit(WSEventEnum.OPTION_REFRESH, data);
  });

  socket.on(WSEventEnum.OPTION_REMOVE, (data) => {
    console.log("output_log: option remove =>>>", data);
    io.emit(WSEventEnum.OPTION_LIST_REFRESH);
    io.emit(WSEventEnum.OPTION_REFRESH, data);
  });
};
