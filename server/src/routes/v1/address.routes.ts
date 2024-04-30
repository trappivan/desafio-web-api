import { Request, Response, Router } from "express";
import jwtVerify from "../../middleware/jwtVerify";
import { AddressController } from "../../address/address.controller";
import AddressValidation from "../../middleware/v1/address/address.validator";

const addressRoutes = Router();

addressRoutes.post(
	"/create",
	[AddressValidation, jwtVerify],
	new AddressController().create
);

addressRoutes.post(
	"/delete",
	[AddressValidation, jwtVerify],
	new AddressController().delete
);

export default addressRoutes;
