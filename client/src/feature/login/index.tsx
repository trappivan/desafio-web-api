"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Form from "./form";
import CustomSnackbar, {
	ISnackbarRef,
} from "@/components/Snackbar/CustomSnackbar";

export default function Login() {
	const sucessSnackbarRef = useRef<ISnackbarRef>(null);
	const errorSnackbarRef = useRef<ISnackbarRef>(null);

	const router = useRouter();

	return (
		<>
			<CustomSnackbar
				ref={sucessSnackbarRef}
				message="Logado com sucesso!"
				severety="success"
			/>
			<CustomSnackbar
				ref={errorSnackbarRef}
				message="Erro ao logar!"
				severety="error"
			/>

			<div className=" bg-slate-800 h-screen w-full">
				<div className="flex flex-col items-center justify-center h-full">
					<div className="flex flex-col items-center w-fit space-y-4">
						<h1 className="text-4xl text-white">Login</h1>

						<Form
							sucessSnackbarRef={sucessSnackbarRef}
							errorSnackbarRef={errorSnackbarRef}
						/>

						<div className="flex justify-between w-full text-blue-700">
							<p className="text-white">Não possui conta? </p>{" "}
							<button onClick={() => router.push("/registrar")}>
								Registre-se
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
