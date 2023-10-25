import { Http } from "@status/codes";
import { BaseException } from "./base.exceptions";

export class NotFoundException extends BaseException {
  constructor(name?: string, message?: string) {
    super(name ?? "NOT_FOUND", message ?? "Not Found", Http.NotFound);
  }
}
