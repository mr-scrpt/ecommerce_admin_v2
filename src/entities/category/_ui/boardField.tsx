import { ProfileAvatar } from "@/entities/user/profile";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC } from "react";
import { useUploadBoardList } from "../_vm/useUploadBoardList";
import { ImgPreviewer } from "@/shared/ui/imgPreviewer/imgPreviewer";
import { Image as ImgIcon } from "lucide-react";

interface AvatarFieldProps {
  value: Array<string>;
  onChange: (value?: Array<string>) => void;
  onDelete: (path: string) => void;
}

export const BoardField: FC<AvatarFieldProps> = (props) => {
  const { value, onChange, onDelete } = props;
  const { openFileDialog, isPending } = useUploadBoardList({
    onSuccess: onChange,
  });

  return (
    <div className="flex flex-wrap w-full gap-5">
      <Button
        variant="secondary"
        type="button"
        onClick={openFileDialog}
        className="gap-2"
      >
        {isPending ? (
          <div className="inset-0 absolute flex items-center justify-center z-10">
            <Spinner
              className="w-10 h-10"
              aria-label="Загрузка новой аватарки"
            />
          </div>
        ) : (
          <ImgIcon />
        )}
        Upload img
      </Button>
      {!!value.length && (
        <ImgPreviewer
          imgPathList={value}
          onDelete={onDelete}
          className="w-full"
        />
      )}
    </div>
  );
};
