import { getDataFromToken } from "@/helpers/getDataFromToken";
import { Snackbar, Alert } from "@mui/material";

type successSnackbar = {
	text: string;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export default function CepSucessSnackbar({
	text,
	open,
	setOpen,
}: successSnackbar) {
	return (
		<Snackbar
			open={open}
			onClose={() => setOpen(false)}
			autoHideDuration={3000}
			anchorOrigin={{ horizontal: "center", vertical: "top" }}>
			<Alert severity="success" sx={{ width: "100%" }}>
				{text}
			</Alert>
		</Snackbar>
	);
}
