"use client";
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
    onSuccess: (imgs) => onChange([...value, ...imgs]),
  });

  return (
    <div className="flex w-full flex-wrap gap-5">
      <Button
        variant="secondary"
        type="button"
        onClick={openFileDialog}
        className="gap-2"
      >
        {isPending ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Spinner
              className="h-10 w-10"
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
