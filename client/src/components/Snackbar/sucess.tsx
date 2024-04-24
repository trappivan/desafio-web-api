import { Snackbar, Alert } from "@mui/material";

type successSnackbar = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export default function SucessSnackbar({ open, setOpen }: successSnackbar) {
	return (
		<Snackbar
			open={open}
			// autoHideDuration={3000}
			onClose={() => setOpen(false)}
			anchorOrigin={{ horizontal: "center", vertical: "top" }}>
			<Alert severity="success" sx={{ width: "100%" }}>
				Logado com sucesso! Redirecionando...
			</Alert>
		</Snackbar>
	);
}
