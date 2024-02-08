import { Server } from "socket.io";
import { WSEventEnum } from "../src/shared/type/websokcetEvent.enum";

const io = new Server(3334, {
  cors: {
    origin: "*",
  },
});

io.on(WSEventEnum.CONNECT, (socket) => {
  socket.on(WSEventEnum.USER_UPDATE, (data) => {
    console.log("output_log: user update =>>>");
    socket.broadcast.emit(WSEventEnum.USER_LIST_REFRESH);
    socket.broadcast.emit(WSEventEnum.USER_REFRESH, data);
  });

  socket.on(WSEventEnum.PROFILE_UPDATE, (data) => {
    console.log("output_log: profile update =>>>");
    socket.broadcast.emit(WSEventEnum.USER_LIST_REFRESH);
    socket.broadcast.emit(WSEventEnum.USER_REFRESH, data);
  });

  socket.on(WSEventEnum.DISCONNECTD, () => {
    console.log("output_log: disconnect  =>>>", socket.id);
  });
});

console.log("ws server start listen on port 3334");
