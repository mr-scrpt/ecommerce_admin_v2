import { Server, Socket } from "socket.io";
import { WSEventEnum } from "../../src/shared/type/websokcetEvent.enum";

export const userEvent = (socket: Socket, io: Server) => {
  socket.on(WSEventEnum.USER_CREATE, (data) => {
    console.log("output_log: user created =>>>", data);
    io.emit(WSEventEnum.USER_LIST_REFRESH);
    io.emit(WSEventEnum.USER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });

  socket.on(WSEventEnum.USER_UPDATE, (data) => {
    console.log("output_log: user update =>>>", data);
    io.emit(WSEventEnum.USER_LIST_REFRESH);
    io.emit(WSEventEnum.USER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });

  socket.on(WSEventEnum.USER_REMOVE, (data) => {
    console.log("output_log: user remove =>>>", data);
    io.emit(WSEventEnum.USER_LIST_REFRESH);
    io.emit(WSEventEnum.USER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });
};
