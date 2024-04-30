import { ValidationError } from "class-validator";
import { ErrorType } from "./types";

export class CustomError extends Error {
	public httpStatusCode: number;
	public errorType: ErrorType;
	public errors: string[] | null;
	public errorRaw: any;
	public errorsValidation: ValidationError[] | null;

	constructor(
		httpStatusCode: number,
		errorType: ErrorType,
		message: string,
		errors: string[] | null = null,
		errorRaw: any = null,
		errorsValidation: ValidationError[] | null = null
	) {
		super(message);

		this.name = this.constructor.name;

		this.httpStatusCode = httpStatusCode;
		this.errorType = errorType;
		this.errors = errors;
		this.errorRaw = errorRaw;
		this.errorsValidation = errorsValidation;
	}
}
