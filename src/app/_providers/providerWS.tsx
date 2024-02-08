import { useAppSession } from "@/entities/user/session";
import { UserEventProvider } from "@/features/userUpdate/_vm/event/userEventProvider";
import { SocketProvider } from "@/shared/lib/socket";
import { FC, HTMLAttributes } from "react";

interface ProviderWSProps extends HTMLAttributes<HTMLDivElement> {}

export const ProviderWS: FC<ProviderWSProps> = (props) => {
  const { children } = props;
  const session = useAppSession();
  return (
    <SocketProvider clientId={session.data?.user.id ?? ""}>
      <UserEventProvider>{children}</UserEventProvider>
    </SocketProvider>
  );
};
