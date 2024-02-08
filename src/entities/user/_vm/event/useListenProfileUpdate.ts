"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateProfile } from "../../profile";
import { UserId } from "../../user";

export const useListenProfileUpdate = () => {
  const invalidateProfile = useInvalidateProfile();

  useSocketHandler(WSEventEnum.PROFILE_REFRESH, (profileId: UserId) => {
    console.log("output_log: profile invalidate =>>>");
    invalidateProfile(profileId);
  });
  // return {
  //   profileUpdateEvent: () => {
  //     socket.emit(WSEventEnum.profile_UPDATE);
  //   },
  // };
};
