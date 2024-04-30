import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../../address/entity/address.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", { length: 255, nullable: false })
	email: string;

	@Column("varchar", { length: 255, nullable: false })
	password: string;

	@Column("date", { nullable: false })
	created_at: Date;

	@Column("date", { nullable: false })
	updated_at: Date;

	@OneToMany(() => Address, (address) => address.user)
	address: Address[];
}
