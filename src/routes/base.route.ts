import { HelloRoute } from "@src/routes/hello.route";
import { ProductRoute } from "./product.route";

const defaultRoutes = [
  {
    path: `/`,
    route: HelloRoute,
  },
  {
    path: `/v1/hello`,
    route: HelloRoute,
  },
  {
    path: `/v1/product`,
    route: ProductRoute,
  },
];
export const DefaultRoute = defaultRoutes;
