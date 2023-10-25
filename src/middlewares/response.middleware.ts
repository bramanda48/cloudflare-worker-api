import { MiddlewareHandler } from "hono";

export const responseHandler: MiddlewareHandler<Environment> = async (c, next) => {
  console.log("TEST 1");
  await next();
  console.log("TEST 2");
};
