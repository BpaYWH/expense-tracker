"use client";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import ActionsCell from "./actions-cell";

export interface Category {
	id: string;
	name: string;
};

export const columns = (mutators: any): Array<ColumnDef<Category>> => {
	return [
		{
			accessorKey: "id",
			header: "ID",
		},
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "actions",
			cell: ({ row }) => {
				const category = row.original;
				return (
					<ActionsCell
						id={category.id}
						name={category.name}
						updator={mutators.updator}
						deleter={mutators.deleter}
					/>
				);
			},
		},
	];
};
