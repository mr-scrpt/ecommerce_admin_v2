import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../src/shared/type/websokcetEvent.enum";

export const productEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.PRODUCT_CREATE, (data) => {
    console.log("output_log: product created =>>>", data);
    io.emit(WSEventEnum.PRODUCT_LIST_REFRESH);
    io.emit(WSEventEnum.PRODUCT_REFRESH, data);
  });

  socket.on(WSEventEnum.PRODUCT_UPDATE, (data) => {
    console.log("output_log: product update =>>>", data);
    io.emit(WSEventEnum.PRODUCT_LIST_REFRESH);
    io.emit(WSEventEnum.PRODUCT_REFRESH, data);
  });

  socket.on(WSEventEnum.PRODUCT_REMOVE, (data) => {
    console.log("output_log: product remove =>>>", data);
    io.emit(WSEventEnum.PRODUCT_LIST_REFRESH);
    io.emit(WSEventEnum.PRODUCT_REFRESH, data);
  });
};
