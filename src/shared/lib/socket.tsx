import React, { useEffect, useState } from "react";
import {
  createStrictContext,
  useEventCallback,
  useStrictContext,
} from "./react";
import { Socket, io } from "socket.io-client";

const socketContext = createStrictContext<Socket>();
const isConnectedContext = createStrictContext<boolean>();

export const SocketProvider = ({
  children,
  clientId,
}: {
  children?: React.ReactNode;
  clientId: string;
}) => {
  const [socket] = useState(() =>
    io("ws://localhost:3334", {
      auth: {
        clientId,
      },
      autoConnect: false,
    }),
  );

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.connect();
    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);
  // console.log("output_log: isConn =>>>", isConnected);
  // console.log("output_log: socket =>>>", socket);

  return (
    <isConnectedContext.Provider value={isConnected}>
      <socketContext.Provider value={socket}>{children}</socketContext.Provider>
    </isConnectedContext.Provider>
  );
};

export const useSocket = () => {
  return useStrictContext(socketContext);
};

export const useIsConnected = () => {
  return useStrictContext(isConnectedContext);
};

export const useSocketHandler = <Arg,>(
  event: string,
  handler: (arg: Arg) => void,
) => {
  const socket = useStrictContext(socketContext);

  const eventHandler = useEventCallback(handler);

  useEffect(() => {
    socket.on(event, eventHandler);

    return () => {
      socket.off(event, eventHandler);
    };
  }, [socket, eventHandler, event]);
};