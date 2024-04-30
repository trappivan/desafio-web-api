"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISnackbarRef } from "@/components/Snackbar/CustomSnackbar";

type FormProps = {
	sucessSnackbarRef: React.RefObject<ISnackbarRef>;
	errorSnackbarRef: React.RefObject<ISnackbarRef>;
};

const formSchema = z.object({
	email: z.string().email({ message: "Use um email válido" }).min(5).max(255),
	password: z.string().min(6).max(255),
});
const Form = ({ sucessSnackbarRef, errorSnackbarRef }: FormProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	async function submitForm(data: FieldValues) {
		console.log(data);
		try {
			await axios.post("http://localhost:4000/api/v1/users/login", data, {
				withCredentials: true,
			});

			router.push("/cep");

			sucessSnackbarRef?.current?.openSnackbar("Logado com sucesso!");

			reset();
		} catch (error: any) {
			console.log(error);
			errorSnackbarRef?.current?.openSnackbar(error.response.data.errorMessage);
		}
	}
	return (
		<>
			<form
				onSubmit={handleSubmit(submitForm)}
				className="flex flex-col items-center justify-center space-y-2">
				<input
					{...register("email", { required: true })}
					type="email"
					placeholder="Email"
					className="bg-slate-700 text-white p-2 rounded-lg border border-solid border-slate-200"
				/>
				{errors.login?.message && (
					<span>
						<>{errors.login?.message}</>
					</span>
				)}
				<input
					{...register("password", { required: true })}
					type="password"
					placeholder="Senha"
					className="bg-slate-700 text-white p-2  rounded-lg border border-solid border-slate-200"
				/>
				{errors.password?.message && (
					<span>
						<>{errors.password?.message}</>
					</span>
				)}

				<button
					type="submit"
					className="bg-slate-700 text-white p-2  rounded-lg border border-solid border-slate-200">
					Entrar
				</button>
			</form>
		</>
	);
};

export default Form;
