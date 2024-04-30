import { Snackbar, Alert } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

type Snackbar = {
	message?: string;
	severety?: "success" | "error" | "warning" | "info" | undefined;
	hideDuration?: number;
};

export interface ISnackbarRef {
	openSnackbar: (message: any) => void;
}

const CustomSnackbar = forwardRef(
	({ message, severety, hideDuration }: Snackbar, ref) => {
		const [open, setOpen] = useState(false);
		const [messageRef, setMessageRef] = useState("");

		useImperativeHandle(ref, () => ({
			openSnackbar(message: string) {
				setMessageRef(message);

				setOpen(true);
			},
		}));

		return (
			<Snackbar
				open={open}
				autoHideDuration={hideDuration || 3000}
				onClose={(event, reason) => {
					if (reason === "clickaway") {
						return;
					}
					setOpen(false);
				}}
				anchorOrigin={{ horizontal: "center", vertical: "top" }}>
				<Alert severity={severety} sx={{ width: "100%" }}>
					{messageRef}
				</Alert>
			</Snackbar>
		);
	}
);

export default CustomSnackbar;
