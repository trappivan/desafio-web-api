import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { RequestUserDto } from "../../../user/dto/request-user.dto";
import { CustomError } from "../../../utils/CustomError";
import { ErrorValidation } from "../../../utils/types";

export default async function RegisterValidator(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { email, password }: RequestUserDto = req.body;

	const errorsValidation: ValidationError[] = [];

	const validateRegister = new RequestUserDto(email, password);
	await validate(validateRegister, { skipMissingProperties: true }).then(
		(errors) => {
			if (errors.length > 0) {
				errors.forEach((e) => {
					errorsValidation.push(e);
				});
				const customError = new CustomError(
					401,
					"General",
					"Erro de validação ao buscar companhia",
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
