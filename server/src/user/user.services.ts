import { AppDataSource } from "../data-source";
import { User } from "./user.entity";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
export class UserService {
	async findOne(email: string) {
		try {
			const user = await AppDataSource.getRepository(User).findOne({
				where: {
					email,
				},
			});

			return user;
		} catch (error) {
			throw new Error("Erro ao buscar usuário");
		}
	}

	async register(email: string, password: string) {
		await AppDataSource.getRepository(User)
			.findOne({
				where: {
					email,
				},
			})
			.then((user) => {
				if (user !== null) throw new Error("Usuário já cadastrado");
			});

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const user = new User(email, hashedPassword, new Date(), new Date());

		try {
			const saved = await AppDataSource.getRepository(User).save(user);

			return saved;
		} catch (error) {
			throw new Error("Erro ao cadastrar usuário");
		}
	}

	async login(email: string, password: string) {
		const user = await this.findOne(email);

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const isMatch = await bcryptjs.compare(password, user.password);

		if (!isMatch) {
			throw new Error("Senha incorreta");
		}

		const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});
		return token;
	}

	async getUser(userId: number) {
		const user = await AppDataSource.getRepository(User).findOne({
			where: { id: userId },
			relations: ["address"],
		});

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		return user;
	}
}
