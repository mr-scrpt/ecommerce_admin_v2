"use client";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { useEmitUserUpdate } from "./useEmitUserUpdate";
import { UserId } from "@/entities/user/user";

export const userUpdateContext =
  createStrictContext<(userId: UserId) => void>();

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
