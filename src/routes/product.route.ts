import { ProductsController } from "@src/controllers/products.controller";
import { Hono } from "hono";

const route = new Hono<Environment>();

// Add the route
route.get("/", ProductsController.getProduct);
route.get("/:id", ProductsController.getProduct);
route.post("/", ProductsController.addProduct);
route.put("/:id", ProductsController.editProduct);
route.delete("/:id", ProductsController.deleteProduct);

export const ProductRoute = route;
