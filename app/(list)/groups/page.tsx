"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import AddGroupDialog from "./add-group-dialog";

import { groupQuery } from "@/lib/graphql/query";

//! TODO: Refresh the data table when the user is added.
function GroupPage(): JSX.Element {
	const { error, data } = useSuspenseQuery(groupQuery);
	if (error != null) return <div>Error! ${error.message}</div>;

	return (
		<div>
			<div
				id="actionBar"
				className="mb-8 px-8 py-2 flex justify-between items-center bg-slate-100"
			>
				<p>Total no. of group : {(data as any).groups.length}</p>

        		<AddGroupDialog />
			</div>

			<div id="dataTable" className="px-4">
				<DataTable columns={columns} data={(data as any).groups} />
			</div>
		</div>
	);
}

export default GroupPage;
