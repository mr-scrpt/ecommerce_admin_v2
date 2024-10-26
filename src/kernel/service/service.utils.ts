import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";

@injectable()
export class ServiceUtils {
  buildMonadErrorArray<T>(
    input: Either<ErrorApp, T>,
  ): Either<Array<ErrorApp>, T> {
    return input.mapLeft((e) => [e]);
  }
}
