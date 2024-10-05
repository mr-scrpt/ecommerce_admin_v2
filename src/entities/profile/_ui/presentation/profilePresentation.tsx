"use client";
import { AuthStatus } from "@/kernel/domain/auth/auth.type";
import { useAppSession } from "@/kernel/lib/nextauth";
import { nicknameGen } from "@/shared/lib/nickname";
import { Spinner } from "@/shared/ui/icons/spinner";
import { ProfileAvatar } from "@/shared/ui/profileAvatar";
import Link from "next/link";
import { FC, HTMLAttributes, forwardRef } from "react";
import {
  ProfilePresentationProps,
  profileDataInjector,
} from "../../_hoc/withProfileData.hoc";
import { ProfileContext, useProfileData } from "../../_vm/profile.provider";

const ProfilePresentationBase: FC<ProfilePresentationProps> = (props) => {
  const { children, profile, isPending, status } = props;

  if (isPending) return <Spinner />;

  return (
    <ProfileContext.Provider value={{ profile, status }}>
      {children}
    </ProfileContext.Provider>
  );
};

const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...rest } = props;

    const { profile, status } = useProfileData();

    if (!profile) return null;
    if (status === AuthStatus.UNAUTHENTICATED) return null;

    const username = nicknameGen(profile);

    return (
      <div ref={ref} className={className} {...rest}>
        <ProfileAvatar
          avatarName={username}
          avatarUrl={profile?.image ?? undefined}
        />
      </div>
    );
  },
);

interface LinkToProfileProps extends HTMLAttributes<HTMLDivElement> {
  textAnchor: string;
}

const LinkToProfile = forwardRef<HTMLDivElement, LinkToProfileProps>(
  (props, ref) => {
    const { textAnchor, ...rest } = props;
    const { profile, status } = useProfileData();

    if (!profile) return null;
    if (status === AuthStatus.UNAUTHENTICATED) return null;

    return (
      <div {...rest} ref={ref}>
        <Link href={`/profile/${profile.id}`}>
          <span>{textAnchor}</span>
        </Link>
      </div>
    );
  },
);

const UserName = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { ...rest } = props;
    const { profile, status } = useProfileData();

    if (!profile) return null;
    if (status === AuthStatus.UNAUTHENTICATED) return null;

    const username = nicknameGen(profile);
    return (
      <div {...rest} ref={ref}>
        {username}
      </div>
    );
  },
);

const DataSession = profileDataInjector(() => {
  const { data, status } = useAppSession();
  const isSuccess = !!(data && status === AuthStatus.AUTHENTICATED);
  const isPending = status === AuthStatus.LOADING;
  const isError = !isSuccess && !isPending;

  const obj = {
    profile: {
      id: data?.user?.id ?? "",
      name: data?.user?.name ?? "",
      lastName: data?.user?.lastName ?? "",
      phone: "",
      email: data?.user?.email ?? "",
      image: data?.user?.image ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status,
    isSuccessProfile: isSuccess,
    isAppearancePendingProfile: isPending,
    isFetchedAfterMountProfile: isSuccess,
    isErrorProfile: isError,
  };
  return obj;
})(ProfilePresentationBase);

export const ProfilePresentation = Object.assign(ProfilePresentationBase, {
  Avatar,
  LinkToProfile,
  UserName,
  DataSession,
});

ProfilePresentation.displayName = "ProfilePresentation";
