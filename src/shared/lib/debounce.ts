const TIMEOUT = 500;
const MIN_LENGTH = 3;

export const debounce = (func: (value: string) => void, timeout = TIMEOUT) => {
  let timer: NodeJS.Timeout;
  return (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(value);
    }, timeout);
  };
};

export const inputDebounce =
  (func: (value: string) => void, timeout = TIMEOUT, minLength = MIN_LENGTH) =>
  (value: string) =>
    value.length >= minLength && debounce(func, timeout)(value);
