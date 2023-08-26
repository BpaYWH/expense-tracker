"use client";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import ActionsCell from "./actions-cell";

export type Group = {
	id: string;
	name: string;
};


export type User = {
	id: string;
	name: string;
	groups: Group[];
};

export const columns = (mutators: any): ColumnDef<User>[] => {
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
		accessorKey: "groups",
		header: "Groups",
		cell: ({ row }) => {
			const users = row.original
			return users.groups.map((group) => <p key={`${users.id}-${group.id}`}>{group.name}</p>);
		}
	},
	{
		accessorKey: "actions",
		cell: ({ row }) => {
         const user = row.original;
         return (
            <ActionsCell id={user.id} name={user.name} updator={mutators.updator} deleter={mutators.deleter} />
         );
      },
	},
]);
}