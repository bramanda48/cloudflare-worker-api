import { HelloController } from "@src/controllers/hello.controller";
import { Hono } from "hono";

const route = new Hono<Environment>();

// Add the route
route.get("/", HelloController.getHello);
export const HelloRoute = route;
