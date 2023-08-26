"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client";

import { columns } from "./columns";
// import { DataTable } from "./data-table";
import DataTable from "@/components/data-table";
import MutationDialog from "@/components/mutation-dialog";

import { groupQuery } from "@/lib/graphql/query";
import { AddGroupMutation, DeleteGroupMutation, UpdateGroupMutation } from "@/lib/graphql/mutation";

const AddGroupDialogProps = {
	triggerText: "Add Group",
	header: "Add New Group",
	buttonText: "Add",
	description: "Write the name of the group you want to add. Click add when you're done.",
	inputLabel: "Name",
}

function GroupPage(): JSX.Element {
	const { error, data } = useSuspenseQuery(groupQuery);
	if (error != null) return <div>Error! ${error.message}</div>;

	const [addGroup] = useMutation(AddGroupMutation, {
		refetchQueries: [groupQuery],
	});
	const [updateGroup] = useMutation(UpdateGroupMutation, {
		refetchQueries: [groupQuery],
	});
	const [deleteGroup] = useMutation(DeleteGroupMutation, {
		refetchQueries: [groupQuery],
	});

	return (
		<div>
			<div
				id="actionBar"
				className="mb-8 px-8 py-2 flex justify-between items-center bg-slate-100"
			>
				<p>Total no. of group : {(data as any).groups.length}</p>

        		<MutationDialog mutator={addGroup} {...AddGroupDialogProps}  />
			</div>

			<div id="dataTable" className="px-4">
				<DataTable columns={columns({ updator: updateGroup, deleter: deleteGroup })} data={(data as any).groups} />
			</div>
		</div>
	);
}

export default GroupPage;
