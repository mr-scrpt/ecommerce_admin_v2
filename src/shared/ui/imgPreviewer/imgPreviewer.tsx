"use client";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";
import { cn } from "../utils";
import { X as IconX } from "lucide-react";

interface ImgPreviewerProps extends HTMLAttributes<HTMLDivElement> {
  imgPathList: Array<string>;
  onDelete: (path: string) => void;
}

export const ImgPreviewer: FC<ImgPreviewerProps> = (props) => {
  const { imgPathList, onDelete, className } = props;
  return (
    <div className={cn(className, "w-full")}>
      <div className="flex w-full flex-wrap border gap-3 p-3">
        {imgPathList.map((item) => (
          <div key={item} className="relative">
            <Image src={item} alt={item} width={200} height={120} />
            <IconX
              onClick={() => onDelete(item)}
              className="absolute -top-3 -right-3 text-red-600 cursor-pointer "
            />
          </div>
        ))}
      </div>
    </div>
  );
};
