import { AppDataSource } from "../data-source";
import { User } from "./entity/user.entity";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { RequestUserDto } from "./dto/request-user.dto";
import { EntityTarget, Repository } from "typeorm";
import handleGetRepository from "../utils/handleGetRepository";
import { UserResponseDTO } from "./dto/response-user.dto";
import { CustomError } from "../utils/CustomError";

config();
export class UserService {
	private userRepository: Repository<User>;

	constructor(entity: EntityTarget<User>) {
		this.userRepository = handleGetRepository(entity);
	}

	async findOneById(id: number) {
		try {
			const user = await this.userRepository.findOne({
				where: {
					id,
				},
			});

			return user;
		} catch (error) {
			throw new CustomError(401, "General", "Erro ao buscar usuário");
		}
	}

	async findOneByEmail(email: string) {
		try {
			const user = await this.userRepository.findOne({
				where: {
					email,
				},
			});

			return user;
		} catch (error) {
			throw new Error("Erro ao buscar usuário");
		}
	}

	async register(user: RequestUserDto) {
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(user.password, salt);

		const newUser = this.userRepository.create({
			email: user.email,
			password: hashedPassword,
			created_at: new Date(),
			updated_at: new Date(),
		});

		try {
			const user = await this.userRepository.save(newUser);

			return new UserResponseDTO(user);
		} catch (error) {
			throw new CustomError(401, "General", "Erro ao cadastrar usuário");
		}
	}

	async login(user: RequestUserDto) {
		const savedUser = await this.findOneByEmail(user.email);

		if (savedUser === null) {
			throw new CustomError(404, "General", "Usuário não encontrado");
		}

		const isMatch = await bcryptjs.compare(user.password, savedUser.password);

		if (!isMatch) {
			throw new CustomError(401, "Unauthorized", "Senha incorreta");
		}

		const token = jwt.sign({ id: savedUser.id }, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		return token;
	}

	async getUser(userId: string | jwt.JwtPayload) {
		const user = await this.userRepository.findOne({
			where: { id: Number(userId) },
			relations: ["address"],
		});

		if (user === null) {
			throw new CustomError(404, "General", "Usuário não encontrado");
		}

		return user;
	}
}
