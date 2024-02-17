import { useAppSession } from "@/entities/user/session";
import { useEmitCategoryUpdate } from "@/features/categoryUpdate";
import { useEmitProductUpdate } from "@/features/productUpdate";
import { useEmitProfileUpdate } from "@/features/profileUpdate";
import { useEmitUserUpdate } from "@/features/userUpdate";
import { ComposeChildren, createStrictContext } from "@/shared/lib/react";
import { SocketProvider } from "@/shared/lib/socket";
import { UserId } from "@/shared/lib/user";
import { FC, HTMLAttributes } from "react";

interface IEventContext {
  emitUserUpdate: (userId: UserId) => void;
  emitProfileUpdate: (userId: UserId) => void;
  emitCategoryUpdate: (userId: UserId) => void;
  emitProductUpdate: (userId: UserId) => void;
  // emitOptionUpdate: (userId: UserId) => void;
}

const EventContext = createStrictContext<IEventContext>();

interface ProviderWSProps extends HTMLAttributes<HTMLDivElement> {}

const EventProvider = (props: ProviderWSProps) => {
  const { children } = props;

  const { userUpdateEvent } = useEmitUserUpdate();
  const { profileUpdateEvent } = useEmitProfileUpdate();
  const { categoryUpdateEvent } = useEmitCategoryUpdate();
  const { productUpdateEvent } = useEmitProductUpdate();
  // const { optionUpdateEvent } = useEmitOptionUpdate();

  const eventContext: IEventContext = {
    emitUserUpdate: userUpdateEvent,
    emitProfileUpdate: profileUpdateEvent,
    emitCategoryUpdate: categoryUpdateEvent,
    emitProductUpdate: productUpdateEvent,
    // emitOptionUpdate: optionUpdateEvent,
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
