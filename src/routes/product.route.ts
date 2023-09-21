import { Hono } from "hono";
import { ProductController } from "@src/controllers/products.controller";

const route = new Hono<Environment>();

// Add the route
route.get("/product", ProductController.getProduct);
route.post("/product", ProductController.addProduct);
route.post("/product/image", ProductController.uploadImageProduct);
route.put("/product", ProductController.editProduct);
route.delete("/product", ProductController.deleteProduct);

export const ProductRoute = route;
