import { selectFile, validateImgSizeMedium } from "@/shared/lib/file";
import { useMutation } from "@tanstack/react-query";
import { uploadBoardListAction } from "../_action/uploadBoardList";
import { BOARD_LIST_FILE_KEY } from "../_constant/formData.contstant";

interface UseUploadBoardListProps {
  onError?: (type?: "big-size") => void;
  onSuccess?: (boardPath: Array<string>) => void;
}

export const useUploadBoardList = (props: UseUploadBoardListProps) => {
  const { onSuccess, onError } = props;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadBoardListAction,
    onSuccess(data) {
      onSuccess?.(data.boardList.path);
    },
  });

  const openFileDialog = async () => {
    const fileList = await selectFile("image/*", true);

    const isValid = fileList.some((item) => validateImgSizeMedium(item));

    if (!isValid) {
      return onError?.("big-size");
    }

    const formData = new FormData();
    fileList.forEach((item) => formData.append(BOARD_LIST_FILE_KEY, item));

    // formData.set(BOARD_LIST_FILE_KEY, file);

    await mutateAsync(formData);
  };

  return {
    isPending,
    openFileDialog,
  };
};
