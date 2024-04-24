import { Snackbar, Alert } from "@mui/material";

type errorSnackbar = {
	text: string;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export default function CepErrorSnackbar({
	text,
	open,
	setOpen,
}: errorSnackbar) {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={() => setOpen(false)}
			anchorOrigin={{ horizontal: "center", vertical: "top" }}>
			<Alert severity="error" sx={{ width: "100%" }}>
				{text}
			</Alert>
		</Snackbar>
	);
}
