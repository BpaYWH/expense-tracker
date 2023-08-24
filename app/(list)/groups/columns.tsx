"use client";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import ActionsCell from "./actions-cell";

export type User = {
	id: string;
	name: string;
};

export const columns: ColumnDef<User>[] = [
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
         const user = row.original;
         return (
            <ActionsCell id={user.id} name={user.name} />
         );
      },
	},
];
