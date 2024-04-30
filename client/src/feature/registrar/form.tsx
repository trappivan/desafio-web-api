"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
	.object({
		email: z.string().email({ message: "Use um email válido" }).min(5).max(255),
		password: z
			.string()
			.min(6, { message: "A senha deve ter mais que 6 caracteres" })
			.max(255),
		confirmPassword: z
			.string()
			.min(6, { message: "A senha deve ter mais que 6 caracteres" })
			.max(255),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: "As senhas não são iguais",
			path: ["confirmPassword"],
		}
	);

export default function Form() {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const router = useRouter();

	async function submitForm(data: FieldValues) {
		console.log(data);

		await axios
			.post("http://localhost:4000/api/v1/users/register", data)
			.then(() => {
				router.push("/login");
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			className="flex flex-col items-center justify-center space-y-2">
			<input
				type="text"
				placeholder="Email"
				{...register("email", { required: true })}
				className="bg-slate-700 text-white p-2 rounded-lg border border-solid border-slate-200"
			/>
			{errors.email?.message && (
				<span>
					<>{errors.email?.message}</>
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
			<input
				type="password"
				placeholder="Confirmar senha"
				{...register("confirmPassword", { required: true })}
				className="bg-slate-700 text-white p-2  rounded-lg border border-solid border-slate-200"
			/>
			{errors.confirmPassword?.message && (
				<span>
					<>{errors.confirmPassword?.message}</>
				</span>
			)}
			<button
				type="submit"
				className="bg-slate-700 text-white p-2 m-2 rounded-lg border border-solid border-slate-200">
				Registrar
			</button>
		</form>
	);
}
