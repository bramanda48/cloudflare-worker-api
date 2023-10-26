import { Http } from "@status/codes";
import { BaseException } from "./base.exceptions";

export class BadRequestException extends BaseException {
  constructor() {
    super("BAD_REQUEST", "Bad Request", Http.BadRequest);
  }
}
