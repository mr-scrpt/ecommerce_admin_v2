// import { Server } from "socket.io";
import { WSEventEnum } from "../src/shared/type/websokcetEvent.enum";
import { socketServer } from "../src/shared/lib/socketServer";

const io = socketServer;
// const io = new Server(3334, {
//   cors: {
//     origin: "*",
//   },
// });

io.on(WSEventEnum.CONNECT, (socket) => {
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

  socket.on(WSEventEnum.PROFILE_UPDATE, (data) => {
    console.log("output_log: profile update =>>>");
    io.emit(WSEventEnum.USER_LIST_REFRESH);
    io.emit(WSEventEnum.USER_REFRESH, data);

    io.emit(WSEventEnum.PROFILE_LIST_REFRESH);
    io.emit(WSEventEnum.PROFILE_REFRESH, data);
  });

  socket.on(WSEventEnum.DISCONNECTD, () => {
    console.log("output_log: disconnect  =>>>", socket.id);
  });
});

console.log("ws server start listen on port 3334");
