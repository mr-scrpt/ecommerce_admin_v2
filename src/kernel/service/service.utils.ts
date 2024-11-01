import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import { IUtilsService } from "./type";

@injectable()
export class UtilsService implements IUtilsService {
  buildMonadErrorArray<T>(
    input: Either<ErrorApp, T>,
  ): Either<Array<ErrorApp>, T> {
    return input.mapLeft((e) => [e]);
  }
}
