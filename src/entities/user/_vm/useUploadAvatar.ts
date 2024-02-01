import { selectFile, validateImgSizeMedium } from "@/shared/lib/file";
import { useMutation } from "@tanstack/react-query";
import { AVATAR_FILE_KEY } from "../_constant/avatar.constant";
import { uploadProfileAvatarAction } from "../_action/uploadProfileAvatar";

interface UseUploadAvatarProps {
  onError?: (type?: "big-size") => void;
  onSuccess?: (avatarPath: string) => void;
}

export const useUploadAvatar = (props: UseUploadAvatarProps) => {
  const { onSuccess, onError } = props;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadProfileAvatarAction,
    // onSuccess(data) {
    //   onSuccess?.(data.avatar.path);
    // },
  });

  const openFileDialog = async () => {
    const file = await selectFile("image/*");

    if (!validateImgSizeMedium(file)) {
      return onError?.("big-size");
    }

    const formData = new FormData();

    formData.set(AVATAR_FILE_KEY, file);

    await mutateAsync(formData);
  };

  return {
    isPending,
    openFileDialog,
  };
};
