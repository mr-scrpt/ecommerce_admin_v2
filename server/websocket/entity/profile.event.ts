import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../../src/shared/type/websokcetEvent.enum";

export const profileEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.PROFILE_UPDATE, (data) => {
    console.log("output_log: profile update =>>>");
    io.emit(WSEventEnum.USER_LIST_REFRESH);
    io.emit(WSEventEnum.USER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });

  socket.on(WSEventEnum.PROFILE_UPDATE, (data) => {
    console.log("output_log: profile update =>>>");
    io.emit(WSEventEnum.USER_LIST_REFRESH);
    io.emit(WSEventEnum.USER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });
};
