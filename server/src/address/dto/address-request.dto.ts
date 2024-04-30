import { IsNotEmpty, IsString } from "class-validator";

export class AddressRequestDTO {
	@IsString()
	@IsNotEmpty()
	cep: string;

	@IsString()
	bairro: string;

	@IsString()
	complemento: string;

	@IsString()
	@IsNotEmpty()
	ddd: string;

	@IsString()
	gia: string;

	@IsString()
	ibge: string;

	@IsString()
	localidade: string;

	@IsString()
	logradouro: string;

	@IsString()
	siafi: string;

	@IsString()
	uf: string;

	constructor({
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
	}) {
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
	}
}
