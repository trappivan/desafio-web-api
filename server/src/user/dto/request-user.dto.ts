import { IsEmail, IsNotEmpty, IsString, Min, isString } from "class-validator";

export class RequestUserDto {
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	@Min(6)
	password: string;
}
