"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client";

import { columns } from "./columns";
import DataTable from "@/components/data-table";
import MutationDialog from "@/components/mutation-dialog";

import { usersQuery } from "@/lib/graphql/query";
import {
	AddUserMutation,
	DeleteUserMutation,
	UpdateUserMutation,
} from "@/lib/graphql/mutation";

// import { calculateTransaction, transform } from "@/lib/transaction/util";

const AddUserDialogProps = {
	triggerText: "Add User",
	header: "Add New User",
	buttonText: "Add",
	description:
		"Write the name of the user you want to add. Click add when you're done.",
	inputLabel: "Name",
};

function UserPage(): JSX.Element {
	const { error, data } = useSuspenseQuery(usersQuery);
	if (error != null) return <div>Error! ${error.message}</div>;

	const [addUser] = useMutation(AddUserMutation, {
		refetchQueries: [usersQuery],
	});
	const [updateUser] = useMutation(UpdateUserMutation, {
		refetchQueries: [usersQuery],
	});
	const [deleteUser] = useMutation(DeleteUserMutation, {
		refetchQueries: [usersQuery],
	});

	// const handleTransform = (): void => {
	// 	const trans = transform();
	// 	const result = calculateTransaction(["Henry", "Lucas", "Oscar", "Potato", "Tommy"].map(name=> {return {name}}), trans);
	// 	console.log(result);
	// }

	return (
		<div>
			{/* <button onClick={handleTransform} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Hi
			</button> */}
			<div
				id="actionBar"
				className="mb-8 px-8 py-2 flex justify-between items-center bg-slate-100"
			>
				<p>Total no. of user : {(data as any).users.length}</p>

				<MutationDialog mutator={addUser} {...AddUserDialogProps} />
			</div>

			<div id="dataTable" className="px-4">
				<DataTable
					columns={columns({ updator: updateUser, deleter: deleteUser })}
					data={(data as any).users}
				/>
			</div>
		</div>
	);
}

export default UserPage;
