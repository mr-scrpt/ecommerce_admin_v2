import { WSEventEnum } from "../src/shared/type/websokcetEvent.enum";
import { socketServer } from "../src/shared/lib/socketServer";
import { userEvent } from "./entity/user.event";
import { profileEvent } from "./entity/profile.event";
import { categoryEvent } from "./entity/category.event";
import { productEvent } from "./entity/product.event";
import { optionEvent } from "./entity/property.event";
import { orderEvent } from "./entity/order.event";
import { deliveryEvent } from "./entity/delivery.event";

const io = socketServer;

io.on(WSEventEnum.CONNECT, (socket) => {
  userEvent(socket, io);
  profileEvent(socket, io);
  categoryEvent(socket, io);
  productEvent(socket, io);
  optionEvent(socket, io);
  orderEvent(socket, io);
  deliveryEvent(socket, io);

  socket.on(WSEventEnum.DISCONNECTD, () => {
    console.log("output_log: disconnect  =>>>", socket.id);
  });
});

console.log("ws server start listen on port 3334");
