import { z } from "zod";

export const ProductsValidation = {
  getProduct: z.object({
    page: z.preprocess(Number, z.number()).default(1),
    limit: z.preprocess(Number, z.number()).default(10),
  }),
  addProduct: z.object({
    title: z.string(),
    content: z.string().nullable(),
    price: z.string().refine(
      (v) => {
        let n = Number(v);
        return !isNaN(n) && v?.length > 0;
      },
      { message: "Invalid number" },
    ),
  }),
  editProduct: z.object({
    title: z.string(),
    content: z.string().nullable(),
    price: z.preprocess(Number, z.number()),
  }),
  editProductParam: z.object({
    id: z.preprocess(Number, z.number()),
  }),
  deleteProductParam: z.object({
    id: z.preprocess(Number, z.number()),
  }),
};
