import { ProfileAvatar } from "@/entities/user/profile";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC, HTMLAttributes } from "react";

interface AvatarFieldProps {
  value?: string;
  onChange: (value?: string) => void;
}

export const AvatarField: FC<AvatarFieldProps> = (props) => {
  const { value, onChange } = props;
  // const { handleFileSelect, isPending } = useUploadAvatar({
  //   onSuccess: onChange,
  // });

  return (
    <Button
      variant="ghost"
      className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
      type="button"
      // onClick={handleFileSelect}
    >
      {/* {isPending && ( */}
      {/*   <div className="inset-0 absolute flex items-center justify-center z-10"> */}
      {/*     <Spinner className="w-10 h-10" aria-label="Загрузка новой аватарки" /> */}
      {/*   </div> */}
      {/* )} */}
      <ProfileAvatar
        className="w-full h-full"
        profile={{ email: "evgeny.paromov@gmail.com", image: value }}
      />
    </Button>
  );
};
