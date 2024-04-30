import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { AddressRequestDTO } from "../../../address/dto/address-request.dto";

export default async function AddressValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const {
		bairro,
		cep,
		ddd,
		gia,
		ibge,
		localidade,
		logradouro,
		siafi,
		uf,
		complemento,
	}: AddressRequestDTO = req.body;

	const errorsValidation: ValidationError[] = [];

	const validateAddress = new AddressRequestDTO({
		bairro,
		cep,
		ddd,
		gia,
		ibge,
		localidade,
		logradouro,
		siafi,
		uf,
		complemento,
	});

	await validate(validateAddress, { skipMissingProperties: true }).then(
		(errors) => {
			if (errors.length > 0) {
				errors.forEach((e) => {
					errorsValidation.push(e);
				});
				const customError = new CustomError(
					401,
					"General",
					"Erro de validação de campos ao criar endereço",
					null,
					null,
					errorsValidation
				);

				return next(customError);
			}
		}
	);

	return next();
}
