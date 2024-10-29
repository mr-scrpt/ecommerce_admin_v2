import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";

export type ReturnedMonadFlat<T> = Either<ErrorApp, T>;
export type ReturnedMonadArray<T> = Either<Array<ErrorApp>, T>;
