import { selectFile, validateImgSizeMedium } from "@/shared/lib/file";
import { useMutation } from "@tanstack/react-query";
import { PRODUCT_LIST_FILE_KEY } from "../_constant/formData.contstant";
import { uploadImgListAction } from "../_action/uploadImgList.action";

interface UseUploadImgListProps {
  onError?: (type?: "big-size") => void;
  onSuccess?: (imgPath: Array<string>) => void;
}

export const useUploadImgList = (props: UseUploadImgListProps) => {
  const { onSuccess, onError } = props;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadImgListAction,
    onSuccess(data) {
      onSuccess?.(data.imgList.path);
    },
  });

  const openFileDialog = async () => {
    const fileList = await selectFile("image/*", true);

    const isValid = fileList.some((item) => validateImgSizeMedium(item));

    if (!isValid) {
      return onError?.("big-size");
    }

    const formData = new FormData();
    fileList.forEach((item) => formData.append(PRODUCT_LIST_FILE_KEY, item));

    // formData.set(img_LIST_FILE_KEY, file);

    await mutateAsync(formData);
  };

  return {
    isPending,
    openFileDialog,
  };
};
