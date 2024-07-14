import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../../src/shared/type/websokcetEvent.enum";

export const adderessEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.ADDRESS_CREATE, (data) => {
    console.log("output_log: adderess created =>>>", data);
    io.emit(WSEventEnum.ADDRESS_LIST_REFRESH);
    io.emit(WSEventEnum.ADDRESS_REFRESH, data);
  });

  socket.on(WSEventEnum.ADDRESS_UPDATE, (data) => {
    console.log("output_log: adderess update =>>>", data);
    io.emit(WSEventEnum.ADDRESS_LIST_REFRESH);
    io.emit(WSEventEnum.ADDRESS_REFRESH, data);
    // io.emit(WSEventEnum.DELIVERY_REFRESH, data);
  });

  socket.on(WSEventEnum.ADDRESS_REMOVE, (data) => {
    console.log("output_log: adderess remove =>>>", data);
    io.emit(WSEventEnum.ADDRESS_LIST_REFRESH);
    io.emit(WSEventEnum.ADDRESS_REFRESH, data);
  });
};
