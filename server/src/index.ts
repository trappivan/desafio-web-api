import { config } from "dotenv";
import { AppDataSource } from "./data-source";
import express from "express";
import { routes } from "./routes";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

config();

const main = async () => {
	try {
		await AppDataSource.initialize();

		console.log("Database connected");
	} catch (error) {
		console.error(error);
	}

	const app = express();

	app.use(express.json());

	let corsOptions: CorsOptions = {
		origin: "http://localhost:3000",
		credentials: true,
		exposedHeaders: ["set-cookie"],
	};
	app.use(cors(corsOptions));

	app.use(cookieParser(process.env.TOKEN_SECRET!));

	app.use(routes);

	app.listen(process.env.PORT, () => {
		console.log(`Server running on port ${process.env.PORT}`);
	});
};

main();
