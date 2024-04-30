import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";

@Entity()
export class Address {
	@PrimaryColumn("varchar", { length: 255, nullable: false })
	cep: string;

	@Column("varchar", { length: 255, nullable: false })
	bairro: string;

	@Column("varchar", { length: 255, nullable: true })
	complemento: string;

	@Column("varchar", { length: 255, nullable: false })
	ddd: string;

	@Column("varchar", { length: 20, nullable: true })
	gia: string;

	@Column("varchar", { length: 255, nullable: false })
	ibge: string;

	@Column("varchar", { length: 255, nullable: false })
	localidade: string;

	@Column("varchar", { length: 255, nullable: false })
	logradouro: string;

	@Column("varchar", { length: 255, nullable: false })
	siafi: string;

	@Column("varchar", { length: 2, nullable: false })
	uf: string;

	@ManyToOne(() => User, (user) => user.address, { cascade: true })
	user: User;

	@Column("int")
	id: number;
}
