import { Http } from "@status/codes";
import { BaseException } from "./base.exceptions";

export class InternalServerErrorException extends BaseException {
  constructor(message?: string) {
    super("INTERNAL_SERVER_ERROR", message ?? "Internal Server Error", Http.InternalServerError);
  }
}
