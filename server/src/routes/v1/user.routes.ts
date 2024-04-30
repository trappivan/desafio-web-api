import { Request, Response, Router } from "express";
import { User } from "../../user/entity/user.entity";
import { UserService } from "../../user/user.services";
import { errorHandler } from "../../middleware/errorHandler";
import jwtVerify from "../../middleware/jwtVerify";
import jwt from "jsonwebtoken";
import { UserController } from "../../user/user.controller";

const userRouter = Router();

userRouter.post("/register", [errorHandler], new UserController().register);

userRouter.post("/login", [], new UserController().login);

userRouter.get("/getAll", [jwtVerify], new UserController().getAll);

export default userRouter;
