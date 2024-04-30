import { AppDataSource } from "../data-source";
import { Address } from "./entity/address.entity";
import { User } from "../user/entity/user.entity";
import handleGetRepository from "../utils/handleGetRepository";
import { EntityTarget, Repository } from "typeorm";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "../user/user.services";
import { AddressResponseDTO } from "./dto/address-response.dto";
import { AddressRequestDTO } from "./dto/address-request.dto";
import { CustomError } from "../utils/CustomError";

export class AddressService {
	private addressRepository: Repository<Address>;

	constructor(addressEntity: EntityTarget<Address>) {
		this.addressRepository = handleGetRepository(addressEntity);
	}

	async findAddressByCep(cep: string) {
		try {
			const address = await this.addressRepository.findOne({
				where: {
					cep,
				},
			});

			return address;
		} catch (error) {
			throw new CustomError(401, "General", "Erro ao buscar endereço pelo CEP");
		}
	}

	async createAddress(address: AddressRequestDTO, cookie: JwtPayload) {
		const user = await new UserService(User).findOneById(cookie.id);

		if (user === null) {
			throw new CustomError(404, "General", "Usuário não encontrado");
		}

		const addressExists = await this.findAddressByCep(address.cep);

		if (addressExists) {
			throw new CustomError(402, "General", "Endereço já cadastrado");
		}

		const createAddress = this.addressRepository.create({
			id: Math.floor(Math.random() * 1000000 + 1),
			bairro: address.bairro,
			cep: address.cep,
			complemento: address.complemento,
			ddd: address.ddd,
			gia: address.gia,
			ibge: address.ibge,
			localidade: address.localidade,
			logradouro: address.logradouro,
			siafi: address.siafi,
			uf: address.uf,
			user,
		});

		try {
			console.log("	address", createAddress);
			const newAddress = await this.addressRepository.save(createAddress);
			console.log("asdasd", newAddress);
			return new AddressResponseDTO(newAddress);
		} catch (error) {
			throw new CustomError(401, "Unauthorized", "Erro ao cadastrar endereço");
		}
	}

	async deleteAddress(address: AddressRequestDTO[]) {
		const deleteAddress = this.addressRepository.create(address);
		console.log("address", address);
		console.log("deleteAddress", deleteAddress);
		try {
			deleteAddress.forEach(async (deleteAddress) => {
				await this.addressRepository.delete(deleteAddress);
			});

			return { message: "Endereços deletados com sucesso" };
		} catch (error) {
			throw new CustomError(401, "General", "Erro ao deletar endereço");
		}
	}
}
