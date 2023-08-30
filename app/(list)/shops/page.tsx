"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client";

import { columns } from "./columns";
import DataTable from "@/components/data-table";
import MutationDialog from "@/components/mutation-dialog";

import { shopsQuery } from "@/lib/graphql/query";
import {
	AddShopMutation,
	DeleteShopMutation,
	UpdateShopMutation,
} from "@/lib/graphql/mutation";

const AddShopDialogProps = {
	triggerText: "Add Shop",
	header: "Add New Shop",
	buttonText: "Add",
	description:
		"Write the name of the shop you want to add. Click add when you're done.",
	inputLabel: "Name",
};

function ShopPage(): JSX.Element {
	const { error, data } = useSuspenseQuery(shopsQuery);
	if (error != null) return <div>Error! ${error.message}</div>;

	const [addShop] = useMutation(AddShopMutation, {
		refetchQueries: [shopsQuery],
	});
	const [updateShop] = useMutation(UpdateShopMutation, {
		refetchQueries: [shopsQuery],
	});
	const [deleteShop] = useMutation(DeleteShopMutation, {
		refetchQueries: [shopsQuery],
	});

	return (
		<div>
			<div
				id="actionBar"
				className="mb-8 px-8 py-2 flex justify-between items-center bg-slate-100"
			>
				<p>Total no. of shop : {(data as any).shops.length}</p>

				<MutationDialog mutator={addShop} {...AddShopDialogProps} />
			</div>

			<div id="dataTable" className="px-4">
				<DataTable
					columns={columns({ updator: updateShop, deleter: deleteShop })}
					data={(data as any).shops}
				/>
			</div>
		</div>
	);
}

export default ShopPage;
