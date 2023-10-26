import { BadRequestException } from "@src/exceptions/bad-request.exception";
import { BaseException } from "@src/exceptions/base.exceptions";
import { InternalServerErrorException } from "@src/exceptions/internal-server.exception";
import { NotFoundException } from "@src/exceptions/not-found.exception";
import { IExceptionMessage, ResponseFormat } from "@src/utils/api-response";
import { Http } from "@status/codes";
import { ErrorHandler, NotFoundHandler } from "hono";
import { ZodError } from "zod";

const genericJSONErrMsg = "Unexpected end of JSON input";
export const errorHandler: ErrorHandler<Environment> = async (err: any, c) => {
  let responseFormat = new ResponseFormat<object>(c);
  let errors: IExceptionMessage[] = [];
  let exception: BaseException;
  let bodyParse: object = c.req.method !== "GET" ? await c.req.json() : {};

  if (err instanceof ZodError) {
    exception = new BadRequestException();
    err.errors.forEach((x) =>
      errors.push(
        new IExceptionMessage(
          "VALIDATION_ERROR",
          `Value of ${x.path} ~ ${x.message}`,
          exception.stack,
        ),
      ),
    );
  } else {
    if (err instanceof SyntaxError && err.message.includes(genericJSONErrMsg)) {
      exception = new BaseException("SYNTAX_ERROR", err.message, Http.InternalServerError);
    } else if (err.name.includes("PrismaClient")) {
      exception = new InternalServerErrorException(err.message);
    } else {
      exception = err;
    }
    errors.push(new IExceptionMessage(exception.codes, exception.message, exception.stack));
  }
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body: bodyParse,
      params: c.req.param(),
      query: c.req.query(),
    })
    .withErrors(errors)
    .json(null, exception.status);
};

export const notFoundHandler: NotFoundHandler<Environment> = async (c) => {
  const responseFormat = new ResponseFormat<object>(c);
  const exception: BaseException = new NotFoundException();
  const errors: IExceptionMessage[] = [];
  const bodyParse: object = await c.req.json();

  errors.push(new IExceptionMessage(exception.codes, exception.message, exception.stack));
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body: c.req.method !== "GET" ? bodyParse : {},
      params: c.req.param(),
      query: c.req.query(),
    })
    .withErrors(errors)
    .json(null, exception.status);
};
