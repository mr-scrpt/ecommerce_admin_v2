import { ProfileAvatar } from "@/entities/user/profile";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC } from "react";
import { useUploadAvatar } from "../_vm/useUploadAvatar";

interface AvatarFieldProps {
  value?: string;
  onChange: (value?: string) => void;
  forLetters: string;
}

export const AvatarField: FC<AvatarFieldProps> = (props) => {
  const { value, onChange, forLetters } = props;
  const { openFileDialog, isPending } = useUploadAvatar({
    onSuccess: onChange,
  });

  return (
    <Button
      variant="ghost"
      className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
      type="button"
      onClick={openFileDialog}
    >
      {isPending && (
        <div className="inset-0 absolute flex items-center justify-center z-10">
          <Spinner className="w-10 h-10" aria-label="Загрузка новой аватарки" />
        </div>
      )}
      <ProfileAvatar
        className="w-full h-full"
        profile={{ email: forLetters, image: value }}
      />
    </Button>
  );
};