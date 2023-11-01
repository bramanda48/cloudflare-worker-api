import { DefaultRoute } from "@src/routes/base.route";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

const app = new Hono<Environment>();

app.use("*", cors());

// errors handler
app.onError(errorHandler);
app.notFound(notFoundHandler);

DefaultRoute.forEach((route) => {
  app.route(`${route.path}`, route.route);
});
export default app;
