import { config } from "dotenv";
import { AppDataSource } from "./data-source";
import express from "express";
import { routes } from "./routes";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

config();
try {
	AppDataSource.initialize();
} catch (error) {
	console.log("errorr", error);
	throw new Error("Database connection error");
}
console.log("Database connected");

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

		app.use(cookieParser(process.env.TOKEN_SECRET!));

		app.use(routes);

		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
	} catch (error) {
		throw new Error("Database connection error");
	}
};

main();
