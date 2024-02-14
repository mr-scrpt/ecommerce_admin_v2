import { FC, HTMLAttributes } from "react";
import { Spinner } from "./icons/spinner";
import { useAppearanceDelay } from "../lib/react";

interface spinnerFullPageProps extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
}

export const SpinnerFullPage: FC<spinnerFullPageProps> = (props) => {
  const { isLoading } = props;

  const show = useAppearanceDelay(isLoading);

  if (show) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner
          className="h-10 w-10 text-primary"
          aria-label="Загрузка страницы"
        />
      </div>
    );
  }

  return null;
};
