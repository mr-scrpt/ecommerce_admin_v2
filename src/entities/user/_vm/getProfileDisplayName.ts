import { Profile } from "../_domain/profile.types";

export const getProfileDisplayName = (profile: Profile) => {
  return profile.name ? profile.name : profile.email;
};
