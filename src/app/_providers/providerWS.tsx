import { useAppSession } from "@/kernel/lib/nextauth";
import { ComposeChildren } from "@/shared/lib/react";
import { SocketProvider } from "@/shared/lib/socket";
import { FC, HTMLAttributes } from "react";

interface ProviderWSProps extends HTMLAttributes<HTMLDivElement> {}

export const ProviderWS: FC<ProviderWSProps> = (props) => {
  const { children } = props;
  const session = useAppSession();
  return (
    <ComposeChildren>
      <SocketProvider clientId={session.data?.user.id ?? ""} />
      {/* <EventProvider /> */}

      {children}
    </ComposeChildren>
  );
};
