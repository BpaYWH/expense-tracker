"use client";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import ActionsCell from "./actions-cell";

export type Shop = {
	id: string;
	name: string;
};

export const columns = (mutators: any): ColumnDef<Shop>[] => {
	return (
 [
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
         const shop = row.original;
         return (
            <ActionsCell id={shop.id} name={shop.name} updator={mutators.updator} deleter={mutators.deleter} />
         );
      },
	},
]);
}