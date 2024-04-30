import { Router } from "express";
import userRouter from "./user.routes";
import addressRoutes from "./address.routes";

const routes = Router();

routes.use("/api/v1/users", userRouter);
routes.use("/api/v1/address", addressRoutes);

export default routes;
