import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import { config } from "dotenv";

import { AddressService } from "./address/address.services";
import { Address } from "./address/address.entity";
import { UserService } from "./user/user.services";
import jwtVerify from "./middleware/jwtVerify";

export const routes = Router();

config();

routes.post(
	"/api/address/create",
	[jwtVerify],
	async (req: Request, res: Response) => {
		const address: Address = req.body;

		//get cookie data
		const token = req.headers.cookie.split("=")[1];
		// decode token
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

		await new AddressService()
			.createAddress(address, decoded)
			.then((address) => {
				res.status(201).json(address);
			})
			.catch((error) => {
				res.status(400).json({ message: error.message });
			});
	}
);

routes.post("/api/users/register", async (req: Request, res: Response) => {
	const { email, password } = req.body;
	await new UserService()
		.register(email, password)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => {
			res.status(400).json({ message: error.message });
		});
});

routes.post("/api/users/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	await new UserService()
		.login(email, password)
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
			return res.status(400).json({ message: error.message });
		});
});

routes.get(
	"/api/users/getAll",
	[jwtVerify],
	async (req: Request, res: Response) => {
		const token = req.headers.cookie.split("=")[1];
		// decode token
		const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET);

		await new UserService()
			.getUser(decoded.id)
			.then((users) => {
				res.status(200).json(users);
			})
			.catch((error) => {
				res.status(400).json({ message: error.message });
			});
	}
);

routes.post(
	"/api/address/delete",
	[jwtVerify],
	async (req: Request, res: Response) => {
		const address: Address[] = req.body;

		await new AddressService()
			.deleteAddress(address)
			.then((response) => {
				res.status(201).json(response);
			})
			.catch((error) => {
				res.status(400).json({ message: error.message });
			});
	}
);
