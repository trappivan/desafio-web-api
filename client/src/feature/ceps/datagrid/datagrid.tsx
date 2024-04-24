"use client";

import { Button, Input } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
	DataGrid,
	GridColDef,
	GridDeleteForeverIcon,
	GridRowProps,
} from "@mui/x-data-grid";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { Address } from "@/feature/ceps";

type DataGridCepProps = {
	address: Address[];
	setSelectedRows: (rows: Address[]) => void;
	deleteRowItems: (rows: Address[]) => void;
};

export default function DatagridCep({
	address,
	setSelectedRows,
	deleteRowItems,
}: DataGridCepProps) {
	function rowSelectionHandler(addresses: Address[]) {
		const selectedRowsData = addresses.map((id) =>
			address.find((row) => row.id === id)
		);
		setSelectedRows(selectedRowsData as Address[]);
	}

	const columns: GridColDef[] = [
		{
			field: "cep",
			headerName: "CEP",
			disableColumnMenu: true,
			sortable: false,
		},
		{
			field: "logradouro",
			headerName: "Logradouro",
			disableColumnMenu: true,
			width: 200,
		},
		{
			field: "complemento",
			headerName: "Complemento",
			disableColumnMenu: true,
			sortable: false,
		},
		{ field: "bairro", headerName: "Bairro", disableColumnMenu: true },
		{ field: "localidade", headerName: "Localidade", disableColumnMenu: true },
		{ field: "uf", headerName: "UF", disableColumnMenu: true, sortable: false },
		{
			field: "ibge",
			headerName: "IBGE",
			disableColumnMenu: true,
			sortable: false,
		},
		{
			field: "gia",
			headerName: "GIA",
			disableColumnMenu: true,
			sortable: false,
		},
		{
			field: "ddd",
			headerName: "DDD",
			disableColumnMenu: true,
			sortable: false,
		},
		{
			field: "siafi",
			headerName: "SIAFI",
			disableColumnMenu: true,
			sortable: false,
		},
		{
			field: "Editar",

			width: 100,
			renderCell: (params) => {
				return (
					<Button
						variant="contained"
						color="primary"
						size="small"
						onClick={() => deleteRowItems([params.row as Address])}>
						<GridDeleteForeverIcon />
					</Button>
				);
			},
		},
	];

	return (
		<div className="h-2/3 w-2/3">
			<DataGrid
				columns={columns}
				rows={address}
				checkboxSelection
				rowSelection={true}
				pageSizeOptions={[5]}
				localeText={{
					noRowsLabel: "Nenhum endereço encontrado",
					noResultsOverlayLabel: "Nenhum resultado encontrado",
				}}
				onRowSelectionModelChange={(ids) =>
					rowSelectionHandler(ids as Address[])
				}
			/>
		</div>
	);
}
