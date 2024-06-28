"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateProfile } from "../../_query/profile.query";

export const useListenProfileUpdate = () => {
  const invalidateProfile = useInvalidateProfile();

  useSocketHandler(WSEventEnum.PROFILE_REFRESH, (profileId: string) => {
    console.log("output_log: profile invalidate =>>>");
    invalidateProfile(profileId);
  });
};
