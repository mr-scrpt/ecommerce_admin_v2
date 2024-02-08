import { useAppSession } from "@/entities/user/session";
import { SocketProvider } from "@/shared/lib/socket";
import { FC, HTMLAttributes } from "react";

interface ProviderSocketWithSessionProps
  extends HTMLAttributes<HTMLDivElement> {}

export const ProviderSocketWithSession: FC<ProviderSocketWithSessionProps> = (
  props,
) => {
  const { children } = props;
  const session = useAppSession();
  return (
    <SocketProvider clientId={session.data?.user.id ?? ""}>
      {children}
    </SocketProvider>
  );
};
