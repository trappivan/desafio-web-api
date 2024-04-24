"use client";

import { Button, Input } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

import DatagridCep from "./datagrid/datagrid";
import CepErrorSnackbar from "./snackbar/error";
import CepSucessSnackbar from "./snackbar/success";
import RemovedCepSucessSnackbar from "./snackbar/removedSucess";
import RemovedCepErrorSnackbar from "./snackbar/removedError";

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

export default function BuscarCep() {
	const [cepValue, setCepValue] = useState<string>("");
	const [address, setAddress] = useState<Address[]>([]);
	const [selectedRows, setSelectedRows] = useState<Address[]>([]);

	const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
	const [openSucessSnackbar, setOpenSucessSnackbar] = useState(false);
	const [openRemovedSucessSnackbar, setOpenRemovedSucessSnackbar] =
		useState(false);
	const [openRemovedErrorSnackbar, setOpenRemovedErrorSnackbar] =
		useState(false);

	useEffect(() => {
		getUserData();
	}, []);

	async function requestAddres(e: React.FormEvent) {
		e.preventDefault();

		try {
			const responseGet = await axios.get(
				`https://viacep.com.br/ws/${cepValue}/json/`
			);

			const responsePost = await axios.post(
				"http://localhost:4000/api/address/create",
				responseGet.data,
				{
					withCredentials: true,
				}
			);

			setAddress([...address, responsePost.data]);

			setOpenSucessSnackbar(true);
		} catch (error) {
			setOpenErrorSnackbar(true);
		}
	}

	async function getUserData() {
		try {
			const response = await axios.get(
				"http://localhost:4000/api/users/getAll",
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
			await axios.post("http://localhost:4000/api/address/delete", rows, {
				withCredentials: true,
			});

			const newAddress = address.filter(
				(row) => !rows.find((selectedRow) => selectedRow.id === row.id)
			);

			setAddress(newAddress);

			setOpenRemovedSucessSnackbar(true);
		} catch (error) {
			console.warn(error);
		}
	}

	return (
		<>
			<CepErrorSnackbar
				text="Erro ao adicionar um cep"
				open={openErrorSnackbar}
				setOpen={setOpenErrorSnackbar}
			/>

			<CepSucessSnackbar
				text="Cep adicionado com sucesso!"
				open={openSucessSnackbar}
				setOpen={setOpenSucessSnackbar}
			/>

			<RemovedCepSucessSnackbar
				text="Removido com sucesso!"
				open={openRemovedSucessSnackbar}
				setOpen={setOpenRemovedSucessSnackbar}
			/>

			<RemovedCepErrorSnackbar
				text="Erro ao remover item!"
				open={openRemovedErrorSnackbar}
				setOpen={setOpenRemovedErrorSnackbar}
			/>

			<div className="flex flex-col justify-center items-center space-y-4 h-screen w-screen bg-slate-500">
				<div className="flex flex-col justify-start items-center">
					<div className="flex">
						<h1>Buscar e adicionar endereços por CEP</h1>
					</div>
					<div className="flex flex-row space-x-4 ">
						<form onSubmit={requestAddres} className="space-x-2">
							<input
								type="text"
								className="bg-slate-700 rounded-lg text-white p-2 border border-solid border-slate-200 "
								placeholder="Digite o CEP"
								color="primary"
								onChange={(e) => {
									setCepValue(e.target.value);
								}}
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
