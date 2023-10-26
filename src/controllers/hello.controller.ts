import { Http } from "@status/codes";
import { Handler } from "hono";

const getHello: Handler<Environment> = async (c) => {
  return c.json(
    {
      hello: "world",
    },
    Http.Ok,
  );
};

export const HelloController = { getHello };
