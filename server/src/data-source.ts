import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./user/entity/user.entity";
import { Address } from "./address/entity/address.entity";
import { config } from "dotenv";

config();

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	synchronize: true,
	logging: false,
	entities: [User, Address],
	migrations: [],
	subscribers: [],
});

export const TestAppDataSource = new DataSource({
	type: "postgres",
	host: process.env.HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	synchronize: true,
	logging: false,
	entities: [User, Address],
	migrations: [],
	subscribers: [],
});
