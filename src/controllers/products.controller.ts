import { Prisma } from "@prisma/client/edge";
import { ProductsService } from "@src/services/products.service";
import { ResponseFormat } from "@src/utils/api-response";
import { ProductsValidation } from "@src/validations/products.validation";
import { Http } from "@status/codes";
import { Handler } from "hono";

const getProduct: Handler<Environment> = async (c) => {
  const queryParse = c.req.query();
  const query = ProductsValidation.getProduct.parse(queryParse);

  const productService = new ProductsService(c.env);
  const responseFormat = new ResponseFormat(c);

  const { page, limit } = query;
  const [total, product] = await productService.getProduct(page, limit);
  return responseFormat
    .withPagination(total, page, limit)
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      query,
    })
    .json(product);
};

const addProduct: Handler<Environment> = async (c) => {
  const bodyParse = await c.req.json();
  const body = ProductsValidation.addProduct.parse(bodyParse);

  const productService = new ProductsService(c.env);
  const responseFormat = new ResponseFormat(c);

  const product = await productService.addProduct({
    title: body.title,
    content: body.content,
    price: new Prisma.Decimal(body.price),
  });
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body,
    })
    .json(product, Http.Created);
};

const editProduct: Handler<Environment> = async (c) => {
  const bodyParse = await c.req.json();
  const body = ProductsValidation.editProduct.parse(bodyParse);
  const paramsParse = c.req.param();
  const params = ProductsValidation.editProductParam.parse(paramsParse);

  const productService = new ProductsService(c.env);
  const responseFormat = new ResponseFormat(c);

  const product = await productService.editProduct(params.id, {
    ...body,
    price: new Prisma.Decimal(body.price),
  });
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body,
      params,
    })
    .json(product, Http.Ok);
};

const deleteProduct: Handler<Environment> = async (c) => {
  const paramsParse = c.req.param();
  const params = ProductsValidation.deleteProductParam.parse(paramsParse);

  const productService = new ProductsService(c.env);
  const responseFormat = new ResponseFormat(c);

  const product = await productService.deleteProduct(params.id);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      params,
    })
    .json(product, Http.Ok);
};

const uploadImageProduct: Handler<Environment> = (c) => {
  return c.json(
    {
      hello: "world",
    },
    Http.Ok,
  );
};

export const ProductsController = {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  uploadImageProduct,
};
