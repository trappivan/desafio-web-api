"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FieldValue, FieldValues, useForm } from "react-hook-form";

import DatagridCep from "./datagrid/datagrid";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomSnackbar, {
	ISnackbarRef,
} from "@/components/Snackbar/CustomSnackbar";

export type Address = {
	id?: number;
	cep?: string;
	logradouro?: string;
	complemento?: string;
	bairro?: string;
	localidade?: string;
	uf?: string;
	ibge?: string;
	gia?: string;
	ddd?: string;
	siafi?: string;
};
import { useSnackbar } from "@mui/base/useSnackbar";
// or
const cepSchema = z.object({
	ceps: z.string().min(8),
});

export default function BuscarCep() {
	const [address, setAddress] = useState<Address[]>([]);
	const [selectedRows, setSelectedRows] = useState<Address[]>([]);

	const { handleSubmit, register, reset } = useForm({
		resolver: zodResolver(cepSchema),
	});

	const errorSnackbarRef = useRef<ISnackbarRef>(null);
	const successSnackbarRef = useRef<ISnackbarRef>(null);
	const removedSuccessSnackbarRef = useRef<ISnackbarRef>(null);
	const removedErrorSnackbarRef = useRef<ISnackbarRef>(null);

	useEffect(() => {
		getUserData();
	}, []);

	async function requestAddres(data: FieldValues) {
		console.log("asdasd", data);
		try {
			const responseGet = await axios.get(
				`https://viacep.com.br/ws/${data.ceps}/json/`
			);

			const responsePost = await axios.post(
				"http://localhost:4000/api/v1/address/create",
				responseGet.data,
				{
					withCredentials: true,
				}
			);

			setAddress([...address, responsePost.data]);

			reset();

			successSnackbarRef?.current?.openSnackbar("Cep adicionado com sucesso!");
		} catch (error: any) {
			errorSnackbarRef?.current?.openSnackbar(error.response.data.errorMessage);
		}
	}

	async function getUserData() {
		try {
			const response = await axios.get(
				"http://localhost:4000/api/v1/users/getAll",
				{
					withCredentials: true,
				}
			);

			setAddress(response?.data?.address);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteRowItems(rows: Address[]) {
		try {
			await axios.post("http://localhost:4000/api/v1/address/delete", rows, {
				withCredentials: true,
			});

			const newAddress = address.filter(
				(row) => !rows.find((selectedRow) => selectedRow.id === row.id)
			);

			setAddress(newAddress);

			removedSuccessSnackbarRef?.current?.openSnackbar(
				"Cep removido com sucesso!"
			);
		} catch (error: any) {
			removedErrorSnackbarRef?.current?.openSnackbar(
				error.response.data.errorMessage
			);
		}
	}
	const snackbar = useSnackbar;
	snackbar();
	return (
		<>
			<CustomSnackbar ref={errorSnackbarRef} severety="error" />
			<CustomSnackbar ref={successSnackbarRef} severety="success" />
			<CustomSnackbar ref={removedSuccessSnackbarRef} severety="success" />
			<CustomSnackbar ref={removedErrorSnackbarRef} severety="error" />

			<div className="flex flex-col justify-center items-center space-y-4 h-screen w-screen bg-slate-500">
				<div className="flex flex-col justify-start items-center">
					<div className="flex">
						<h1>Buscar e adicionar endereços por CEP</h1>
					</div>
					<div className="flex flex-row space-x-4 ">
						<form onSubmit={handleSubmit(requestAddres)} className="space-x-2">
							<input
								{...register("ceps", { required: true })}
								type="text"
								className="bg-slate-700 rounded-lg text-white p-2 border border-solid border-slate-200 "
								placeholder="Digite o CEP"
								color="primary"
							/>
							<button
								className="p-2 rounded-lg border border-solid border-slate-200 text-white "
								type="submit">
								Buscar
							</button>
						</form>
					</div>
				</div>

				<DatagridCep
					address={address}
					deleteRowItems={deleteRowItems}
					setSelectedRows={setSelectedRows}
				/>

				{selectedRows.length > 0 ? (
					<button
						onClick={() => {
							deleteRowItems(selectedRows);
						}}
						className="bg-slate-700 text-white p-2 rounded-lg border border-solid border-slate-200">
						Remover ite
						{selectedRows.length > 1 ? "ns  selecionados" : "m  selecionado"}
					</button>
				) : null}
			</div>
		</>
	);
}
