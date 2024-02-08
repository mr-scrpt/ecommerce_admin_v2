"use client";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { useEmitProfileUpdate } from "./useEmitProfileUpdate";
import { UserId } from "@/entities/user/user";

export const profileUpdateContext =
  createStrictContext<(profileId: UserId) => void>();

export function ProfileEventProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { profileUpdateEvent } = useEmitProfileUpdate();
  return (
    <profileUpdateContext.Provider value={profileUpdateEvent}>
      {children}
    </profileUpdateContext.Provider>
  );
}

export const useProfileUpdateContext = () => {
  const useSelector = useStrictContext(profileUpdateContext);
  return useSelector;
};
