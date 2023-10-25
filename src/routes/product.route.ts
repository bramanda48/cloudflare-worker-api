import { Hono } from "hono";
import { ProductsController } from "@src/controllers/products.controller";

const route = new Hono<Environment>();

// Add the route
route.get("/", ProductsController.getProduct);
route.get("/:id", ProductsController.getProduct);
route.post("/", ProductsController.addProduct);
route.post("/image", ProductsController.uploadImageProduct);
route.put("/:id", ProductsController.editProduct);
route.delete("/:id", ProductsController.deleteProduct);

export const ProductRoute = route;
