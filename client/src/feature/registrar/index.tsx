"use client";

import React from "react";
import Form from "./form";

export default function Registrar() {
	return (
		<>
			<div className="bg-slate-800 h-screen w-full">
				<div className="flex flex-col items-center justify-center h-full">
					<h1 className="text-4xl text-white">Registrar</h1>
					<Form />
				</div>
			</div>
		</>
	);
}
