"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Registrar() {
	const [user, setUser] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const router = useRouter();

	async function submitForm(event: any) {
		event.preventDefault();
		if (
			user.password.length > 0 &&
			user.confirmPassword.length > 0 &&
			user.email.length > 0
		) {
			await axios
				.post("http://localhost:4000/api/users/register", user)
				.then(() => {
					router.push("/login");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
	return (
		<>
			<div className="bg-slate-800 h-screen w-full">
				<div className="flex flex-col items-center justify-center h-full">
					<h1 className="text-4xl text-white">Registrar</h1>
					<form
						onSubmit={submitForm}
						className="flex flex-col items-center justify-center space-y-2">
						<input
							type="text"
							placeholder="Email"
							onChange={(e) => {
								setUser({ ...user, email: e.target.value });
							}}
							className="bg-slate-700 text-white p-2 rounded-lg border border-solid border-slate-200"
						/>

						<input
							type="password"
							placeholder="Senha"
							onChange={(e) => {
								setUser({ ...user, password: e.target.value });
							}}
							className="bg-slate-700 text-white p-2  rounded-lg border border-solid border-slate-200"
						/>
						<input
							type="password"
							placeholder="Confirmar senha"
							onChange={(e) => {
								setUser({ ...user, confirmPassword: e.target.value });
							}}
							className="bg-slate-700 text-white p-2  rounded-lg border border-solid border-slate-200"
						/>
						<button
							type="submit"
							className="bg-slate-700 text-white p-2 m-2 rounded-lg border border-solid border-slate-200">
							Registrar
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
