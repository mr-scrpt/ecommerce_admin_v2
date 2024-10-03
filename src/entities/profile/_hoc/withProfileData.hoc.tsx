import { Profile } from "@/kernel/domain/profile/profile.type";
import { Spinner } from "@/shared/ui/icons/spinner";
import { ComponentType, HTMLAttributes, ReactNode } from "react";

export interface WithProfileDataProps {
  profile: Profile | null;
  isSuccessProfile: boolean;
  isAppearancePendingProfile: boolean;
  isFetchedAfterMountProfile: boolean;
  isErrorProfile: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
}

export interface ProfilePresentationProps
  extends HTMLAttributes<HTMLDivElement> {
  profile: Profile | null;
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
  isError: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
}

export const profileDataInjector = <P extends object>(
  useDataHook: (props: P) => WithProfileDataProps,
) => {
  return function HOC(
    WrappedComponent: ComponentType<ProfilePresentationProps>,
  ) {
    return function WithProfileData(props: P & { children?: ReactNode }) {
      const { children, ...restProps } = props;
      const {
        profile,
        isSuccessProfile,
        isAppearancePendingProfile,
        isFetchedAfterMountProfile,
        isErrorProfile,
        status,
      } = useDataHook(restProps as P);

      if (isAppearancePendingProfile) return <Spinner />;
      console.log("output_log: Profile =>>>", profile);
      console.log("output_log: Children =>>>", children);

      return (
        <WrappedComponent
          {...restProps}
          profile={profile}
          isSuccess={isSuccessProfile}
          isPending={isAppearancePendingProfile}
          isFetchedAfterMount={isFetchedAfterMountProfile}
          status={status}
          isError={isErrorProfile}
        >
          {children}
        </WrappedComponent>
      );
    };
  };
};
