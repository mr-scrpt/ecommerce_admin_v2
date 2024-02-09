import { useAppSession } from "@/entities/user/session";
import { UserId } from "@/entities/user/user";
import { useEmitProfileUpdate } from "@/features/profileUpdate";
import { useEmitUserUpdate } from "@/features/userUpdate";
import { ComposeChildren, createStrictContext } from "@/shared/lib/react";
import { SocketProvider } from "@/shared/lib/socket";
import { FC, HTMLAttributes } from "react";

interface IEventContext {
  emitUserUpdate: (userId: UserId) => void;
  emitProfileUpdate: (userId: UserId) => void;
}

const EventContext = createStrictContext<IEventContext>();

interface ProviderWSProps extends HTMLAttributes<HTMLDivElement> {}

const EventProvider = (props: ProviderWSProps) => {
  const { children } = props;

  const { userUpdateEvent } = useEmitUserUpdate();
  const { profileUpdateEvent } = useEmitProfileUpdate();

  const eventContext: IEventContext = {
    emitUserUpdate: userUpdateEvent,
    emitProfileUpdate: profileUpdateEvent,
  };

  return (
    <EventContext.Provider value={eventContext}>
      {children}
    </EventContext.Provider>
  );
};

export const ProviderWS: FC<ProviderWSProps> = (props) => {
  const { children } = props;
  const session = useAppSession();
  return (
    <ComposeChildren>
      <SocketProvider clientId={session.data?.user.id ?? ""} />
      <EventProvider />

      {children}
    </ComposeChildren>
  );
};
