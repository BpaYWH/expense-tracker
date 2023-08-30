"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client";

import { columns } from "./columns";
import DataTable from "@/components/data-table";
import MutationDialog from "@/components/mutation-dialog";

import { categoriesQuery } from "@/lib/graphql/query";
import {
	AddCategoryMutation,
	DeleteCategoryMutation,
	UpdateCategoryMutation,
} from "@/lib/graphql/mutation";

const AddCategoryDialogProps = {
	triggerText: "Add Category",
	header: "Add New Category",
	buttonText: "Add",
	description:
		"Write the name of the category you want to add. Click add when you're done.",
	inputLabel: "Name",
};

function CategoryPage(): JSX.Element {
	const { error, data } = useSuspenseQuery(categoriesQuery);
	if (error != null) return <div>Error! ${error.message}</div>;

	const [addShop] = useMutation(AddCategoryMutation, {
		refetchQueries: [categoriesQuery],
	});
	const [updateShop] = useMutation(UpdateCategoryMutation, {
		refetchQueries: [categoriesQuery],
	});
	const [deleteShop] = useMutation(DeleteCategoryMutation, {
		refetchQueries: [categoriesQuery],
	});

	return (
		<div>
			<div
				id="actionBar"
				className="mb-8 px-8 py-2 flex justify-between items-center bg-slate-100"
			>
				<p>Total no. of shop : {(data as any).categories.length}</p>

				<MutationDialog mutator={addShop} {...AddCategoryDialogProps} />
			</div>

			<div id="dataTable" className="px-4">
				<DataTable
					columns={columns({ updator: updateShop, deleter: deleteShop })}
					data={(data as any).categories}
				/>
			</div>
		</div>
	);
}

export default CategoryPage;
