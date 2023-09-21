import { Handler } from "hono";
import { Http } from "@status/codes";

const getHello: Handler<Environment> = async (c) => {
  return c.json(
    {
      hello: "world",
    },
    Http.Ok,
  );
};

export const HelloController = { getHello };
