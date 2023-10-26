import { HTTPException } from "hono/http-exception";

export class BaseException extends HTTPException {
  public codes: string;

  constructor(code: string, message: string, status: number) {
    super(status, { message: message });
    this.codes = code.toUpperCase();
  }
}
