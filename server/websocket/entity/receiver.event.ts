import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../../src/shared/type/websokcetEvent.enum";

export const receiverEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.RECEIVER_CREATE, (data) => {
    console.log("output_log: receiver created =>>>", data);
    io.emit(WSEventEnum.RECEIVER_LIST_REFRESH);
    io.emit(WSEventEnum.RECEIVER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });

  socket.on(WSEventEnum.RECEIVER_UPDATE, (data) => {
    console.log("output_log: receiver update =>>>", data);
    io.emit(WSEventEnum.RECEIVER_LIST_REFRESH);
    io.emit(WSEventEnum.RECEIVER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });

  socket.on(WSEventEnum.RECEIVER_REMOVE, (data) => {
    console.log("output_log: receiver remove =>>>", data);
    io.emit(WSEventEnum.RECEIVER_LIST_REFRESH);
    io.emit(WSEventEnum.RECEIVER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });
};
