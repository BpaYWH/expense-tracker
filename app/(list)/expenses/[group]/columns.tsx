"use client";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { format } from "date-fns";
import fromUnixTime from "date-fns/fromUnixTime";
import ActionsCell from "./actions-cell";

import type { Shop } from "../../shops/columns";
import type { Category } from "../../categories/columns";

export interface User {
	id: string;
	name: string;
};
export interface Group {
	id: string;
	name: string;
};

export interface Expense {
	id: string;
	item: string;
	price: string;
	taxRate: string;
	shop: Shop;
	paidAt: string;
	paidUser: User;
	consumedUsers: User[];
	group: Group;
	category: Category;
};

export const columns = (mutators: any, baseData: any): Array<ColumnDef<Expense>> => {
	return [
		{
			accessorKey: "category",
			header: "Category",
			cell: ({ row }) => <p>{row.original.category.name}</p>,
		},
		{
			accessorKey: "item",
			header: "Item",
		},
		{
			accessorKey: "price",
			header: "Price",
		},
		{
			accessorKey: "taxRate",
			header: "Tax Rate",
		},
		{
			accessorKey: "shop",
			header: "Shop",
			cell: ({ row }) => <p>{row.original.shop.name}</p>,
		},
		{
			accessorKey: "paidUser",
			header: "Paid By",
			cell: ({ row }) => <p>{row.original.paidUser.name}</p>,
		},
		{
			accessorKey: "consumedUsers",
			header: "Consumed By",
			cell: ({ row }) => {
				const item = row.original.item;
				const users = row.original.consumedUsers;
				return users.map((user) => (
					<p key={`${item}-${user.id}`}>{user.name}</p>
				));
			},
		},
		{
			accessorKey: "paidAt",
			header: "Paid Date",
			cell: ({ row }) => {
				const unix = row.original.paidAt;
				return <p>{format(fromUnixTime(Number(unix) / 1000), "yyyy-MM-dd")}</p>;
			},
		},
		{
			accessorKey: "actions",
			cell: ({ row }) => {
				const expenses = row.original;
				return (
					<ActionsCell
						{...expenses}
						baseData={baseData}
						updator={mutators.updator}
						deleter={mutators.deleter}
					/>
				);
			},
		},
	];
};
