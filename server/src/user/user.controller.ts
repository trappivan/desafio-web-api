import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { RequestUserDto } from "./dto/request-user.dto";
import { User } from "./entity/user.entity";
import jwt, { JwtPayload } from "jsonwebtoken";
import decodeJwtToken from "../utils/decodeJwtToken";

export class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		const requestUser: RequestUserDto = req.body;

		await new UserService(User)
			.register(requestUser)
			.then((user) => {
				res.status(201).json(user);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async login(req: Request, res: Response, next: NextFunction) {
		const { email, password }: RequestUserDto = req.body;

		await new UserService(User)
			.login({ email, password })
			.then((token) => {
				return res
					.cookie("token", token, {
						httpOnly: true,
						expires: new Date(Date.now() + 900000),
						secure: true,
						sameSite: "none",
					})
					.status(201)
					.json({ message: "Usuário Logado" });
			})
			.catch((error) => {
				return next(error);
			});
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.cookie.split("=")[1];
		// decode token
		const decoded = decodeJwtToken(token);

		await new UserService(User)
			.getUser(decoded.id)
			.then((users) => {
				return res.status(200).json(users);
			})
			.catch((error) => {
				return next(error);
			});
	}
}
