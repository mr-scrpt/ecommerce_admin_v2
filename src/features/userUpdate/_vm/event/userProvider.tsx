"use client";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { useEmitUserUpdate } from "./useUserUpdateEmit";

export const userUpdateContext = createStrictContext<() => void>();

export function UserEventProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { userUpdateEvent } = useEmitUserUpdate();
  return (
    <userUpdateContext.Provider value={userUpdateEvent}>
      {children}
    </userUpdateContext.Provider>
  );
}

export const useUserUpdateContext = () => {
  const useSelector = useStrictContext(userUpdateContext);
  return useSelector;
};
