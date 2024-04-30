import { config } from "dotenv";
import { AppDataSource } from "./data-source";
import express from "express";

import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes/v1";

config();
try {
	AppDataSource.initialize();
	console.log("Database connected");
} catch (error) {
	console.log("errorr", error);
	throw new Error("Database connection error");
}

const main = async () => {
	try {
		const app = express();

		app.use(express.json());

		let corsOptions: CorsOptions = {
			origin: "http://localhost:3000",
			credentials: true,
			exposedHeaders: ["set-cookie"],
		};
		app.use(cors(corsOptions));

		app.use(routes);

		app.use(errorHandler);

		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
	} catch (error) {
		throw new Error("Sever startup error");
	}
};

main();
