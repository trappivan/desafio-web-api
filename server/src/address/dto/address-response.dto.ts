import { User } from "../../user/entity/user.entity";
import { Address } from "../entity/address.entity";

export class AddressResponseDTO {
	id: number;
	cep: string;
	bairro: string;
	complemento: string;
	ddd: string;
	gia: string;
	ibge: string;
	localidade: string;
	logradouro: string;
	siafi: string;
	uf: string;
	user: User;

	constructor({
		id,
		cep,
		bairro,
		complemento,
		ddd,
		gia,
		ibge,
		localidade,
		logradouro,
		siafi,
		uf,
		user,
	}: Partial<Address>) {
		this.id = id;
		this.cep = cep;
		this.bairro = bairro;
		this.complemento = complemento;
		this.ddd = ddd;
		this.gia = gia;
		this.ibge = ibge;
		this.localidade = localidade;
		this.logradouro = logradouro;
		this.siafi = siafi;
		this.uf = uf;
		this.user = user;
	}
}
