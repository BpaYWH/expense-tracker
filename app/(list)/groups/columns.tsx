"use client";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import ActionsCell from "./actions-cell";

export type User = {
	id: string;
	name: string;
};

export type Group = {
	id: string;
	name: string;
	users: User[];
};

export const columns = (mutators: any): ColumnDef<Group>[] => {
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
			accessorKey: "users",
			header: "Users",
			cell: ({ row }) => {
				const users = row.original.users;
				return users?.map((user) => <p key={`${user.id}`}>{user.name}</p>);
			}
		},
		{
			accessorKey: "actions",
			cell: ({ row }) => {
				const groups = row.original;
				return (
					<ActionsCell id={groups.id} name={groups.name} inGroupUsers={groups.users} updator={mutators.updator} deleter={mutators.deleter} />
				);
			},
		},
	]);
}
