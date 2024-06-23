import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../src/shared/type/websokcetEvent.enum";

export const deliveryEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.DELIVERY_CREATE, (data) => {
    console.log("output_log: delivery created =>>>", data);
    io.emit(WSEventEnum.DELIVERY_LIST_REFRESH);
    io.emit(WSEventEnum.DELIVERY_REFRESH, data);
  });

  socket.on(WSEventEnum.DELIVERY_UPDATE, (data) => {
    console.log("output_log: delivery update =>>>", data);
    io.emit(WSEventEnum.DELIVERY_LIST_REFRESH);
    io.emit(WSEventEnum.DELIVERY_REFRESH, data);
  });

  socket.on(WSEventEnum.DELIVERY_REMOVE, (data) => {
    console.log("output_log: delivery remove =>>>", data);
    io.emit(WSEventEnum.DELIVERY_LIST_REFRESH);
    io.emit(WSEventEnum.DELIVERY_REFRESH, data);
  });
};
