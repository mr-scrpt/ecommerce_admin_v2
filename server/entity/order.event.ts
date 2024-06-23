import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../src/shared/type/websokcetEvent.enum";

export const orderEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.ORDER_CREATE, (data) => {
    console.log("output_log: order created =>>>", data);
    io.emit(WSEventEnum.ORDER_LIST_REFRESH);
    io.emit(WSEventEnum.ORDER_REFRESH, data);
  });

  socket.on(WSEventEnum.ORDER_UPDATE, (data) => {
    console.log("output_log: order update =>>>", data);
    io.emit(WSEventEnum.ORDER_LIST_REFRESH);
    io.emit(WSEventEnum.ORDER_REFRESH, data);
    io.emit(WSEventEnum.DELIVERY_REFRESH, data);
  });

  socket.on(WSEventEnum.ORDER_REMOVE, (data) => {
    console.log("output_log: order remove =>>>", data);
    io.emit(WSEventEnum.ORDER_LIST_REFRESH);
    io.emit(WSEventEnum.ORDER_REFRESH, data);
  });
};
