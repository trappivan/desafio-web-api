import { Snackbar, Alert } from "@mui/material";

type errorSnackbar = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export default function ErrorSnackbar({ open, setOpen }: errorSnackbar) {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={() => setOpen(false)}
			anchorOrigin={{ horizontal: "center", vertical: "top" }}>
			<Alert severity="error" sx={{ width: "100%" }}>
				Erro ao logar! Tente novamente...
			</Alert>
		</Snackbar>
	);
}
