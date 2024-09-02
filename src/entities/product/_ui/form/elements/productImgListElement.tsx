"use client";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC } from "react";
import { ImgPreviewer } from "@/shared/ui/imgPreviewer/imgPreviewer";
import { Image as ImgIcon } from "lucide-react";
import { useUploadImgList } from "../../../_vm/useUploadImgList";

interface ProductImgListElementProps {
  value: Array<string>;
  onChange: (value?: Array<string>) => void;
  // onDelete: (path: string) => void;
}

export const ProductImgListElement: FC<ProductImgListElementProps> = (
  props,
) => {
  const { value, onChange } = props;
  console.log("output_log: value =>>>", value);
  const { openFileDialog, isPending } = useUploadImgList({
    onSuccess: (imgs) => onChange([...value, ...imgs]),
  });

  const onDelete = (path: string) => {
    onChange(value.filter((img) => img !== path));
  };

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
              aria-label="Загрузка новой фотографии"
            />
          </div>
        ) : (
          <ImgIcon />
        )}
        Upload img
      </Button>
      {!!value?.length && (
        <ImgPreviewer
          imgPathList={value}
          onDelete={onDelete}
          className="w-full"
        />
      )}
    </div>
  );
};
