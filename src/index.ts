import { DefaultRoute } from "@src/routes/base.route";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<Environment>();

app.use("*", cors());

DefaultRoute.forEach((route) => {
  app.route(`${route.path}`, route.route);
});
export default app;
