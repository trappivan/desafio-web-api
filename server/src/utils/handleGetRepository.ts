import { EntityTarget, Repository } from "typeorm";

import { AppDataSource, TestAppDataSource } from "../data-source";
import { config } from "dotenv";

config();

const handleGetRepository = <T>(entity: EntityTarget<T>): Repository<T> => {
	const environment = process.env.NODE_ENV || "development";
	return environment === "test"
		? TestAppDataSource.manager.getRepository(entity)
		: AppDataSource.manager.getRepository(entity);
};

export default handleGetRepository;
