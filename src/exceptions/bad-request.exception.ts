import { Http } from "@status/codes";
import { BaseException } from "./base.exceptions";
import { IExceptionMessage, IMetadataFormat, ResponseFormat } from "@src/utils/api-response";
import { ZodError } from "zod";

export class BadRequestException extends BaseException {
  constructor() {
    super("BAD_REQUEST", "Bad Request", Http.BadRequest);
  }
}
