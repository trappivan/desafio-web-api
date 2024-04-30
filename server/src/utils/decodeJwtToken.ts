import { config } from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

config();

export default function decodeJwtToken(token: string) {
	const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;

	return decoded;
}
