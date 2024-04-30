export class UserResponseDTO {
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;

	constructor({ email, password, created_at, updated_at }) {
		this.email = email;
		this.password = password;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
}
