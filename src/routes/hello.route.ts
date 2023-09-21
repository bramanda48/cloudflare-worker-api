import { Hono } from "hono";
import { HelloController } from "@src/controllers/hello.controller";

const route = new Hono<Environment>();

// Add the route
route.get("/", HelloController.getHello);
export const HelloRoute = route;
