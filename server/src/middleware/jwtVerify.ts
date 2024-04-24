import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function jwtVerify(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.cookie.split("=")[1];

	const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET);

	if (decoded) {
		return next();
	}

	return res.status(400).send("Token inválido");
}
