import { EntityTarget, Repository } from "typeorm";
import handleGetRepository from "../utils/handleGetRepository";
import { Address } from "./entity/address.entity";
import { NextFunction, Request, Response } from "express";
import { AddressService } from "./address.services";
import jwt, { JwtPayload } from "jsonwebtoken";
import decodeJwtToken from "../utils/decodeJwtToken";
import { AddressRequestDTO } from "./dto/address-request.dto";

export class AddressController {
	async create(req: Request, res: Response, next: NextFunction) {
		const address: AddressRequestDTO = req.body;
		//get cookie data
		const token = req.headers.cookie.split("=")[1];
		// decode token
		const decoded = decodeJwtToken(token);

		await new AddressService(Address)
			.createAddress(address, decoded)
			.then((address) => {
				return res.status(201).json(address);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const address: AddressRequestDTO[] = req.body;
		console.log("address controller", address);
		await new AddressService(Address)
			.deleteAddress(address)
			.then((response) => {
				return res.status(201).json(response);
			})
			.catch((error) => {
				console.log(error);
				return next(error);
			});
	}
}
