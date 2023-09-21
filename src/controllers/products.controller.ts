import { ProductService } from "@src/services/products.service";
import { Http } from "@status/codes";
import { Handler } from "hono";

const getProduct: Handler<Environment> = async (c) => {
  const productService = new ProductService(c.env);
  const product = await productService.getProduct();
  return c.json({ data: c.env.DATABASE_URL }, Http.Ok);
};

const addProduct: Handler<Environment> = (c) => {
  return c.json(
    {
      hello: "world",
    },
    Http.Created,
  );
};

const editProduct: Handler<Environment> = (c) => {
  return c.json(
    {
      hello: "world",
    },
    Http.Ok,
  );
};

const deleteProduct: Handler<Environment> = (c) => {
  return c.json(
    {
      hello: "world",
    },
    Http.Ok,
  );
};

const uploadImageProduct: Handler<Environment> = (c) => {
  return c.json(
    {
      hello: "world",
    },
    Http.Ok,
  );
};

export const ProductController = {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  uploadImageProduct,
};
