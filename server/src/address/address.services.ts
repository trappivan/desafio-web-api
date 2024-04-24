import { AppDataSource } from "../data-source";
import { Address } from "./address.entity";
import { User } from "../user/user.entity";

export class AddressService {
	async createAddress(address: Address, cookie: any) {
		const user = await AppDataSource.getRepository(User).findOne({
			where: { id: cookie.id },
			relations: ["address"],
		});

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const createAddress = new Address(
			Math.floor(Math.random() * 1000000 + 1),
			address.bairro,
			address.cep,
			address.complemento,
			address.ddd,
			address.gia,
			address.ibge,
			address.localidade,
			address.logradouro,
			address.siafi,
			address.uf,
			user
		);

		try {
			const newAddress = await AppDataSource.getRepository(Address).save(
				createAddress
			);

			return newAddress;
		} catch (error) {
			throw new Error("Erro ao cadastrar endereço");
		}
	}

	async deleteAddress(address: Address[]) {
		try {
			const addressRepository = AppDataSource.getRepository(Address);
			address.forEach(async (address) => {
				await addressRepository.delete(address);
			});

			return { message: "Endereços deletados com sucesso" };
		} catch (error) {
			throw new Error("Erro ao deletar endereço");
		}
	}
}
