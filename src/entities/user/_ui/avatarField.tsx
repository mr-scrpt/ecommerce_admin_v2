import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC } from "react";
import { useUploadAvatar } from "../_vm/useUploadAvatar";
import { ProfileAvatar } from "@/shared/ui/profileAvatar";

interface AvatarFieldProps {
  onChange: (value?: string) => void;
  avatarName: string;
  avatarUrl?: string;
}

export const AvatarField: FC<AvatarFieldProps> = (props) => {
  const { onChange, avatarName, avatarUrl } = props;
  const { openFileDialog, isPending } = useUploadAvatar({
    onSuccess: onChange,
  });

  return (
    <Button
      variant="ghost"
      className="relative block h-[84px] w-[84px] rounded-full p-0.5"
      type="button"
      onClick={openFileDialog}
    >
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Spinner className="h-10 w-10" aria-label="Загрузка новой аватарки" />
        </div>
      )}
      <ProfileAvatar
        className="h-full w-full"
        avatarName={avatarName}
        avatarUrl={avatarUrl}
        // avatarName={{ email: forLetters, image: value, phone: "" }}
      />
    </Button>
  );
};
