"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client";

import { columns } from "./columns";
import DataTable from "@/components/data-table";
import MutationDialog from "./add-expense-dialog";

import {
	expensesQuery,
	groupQuery,
	shopsQuery,
	categoriesQuery,
} from "@/lib/graphql/query";
import {
	AddExpenseMutation,
	DeleteExpenseMutation,
	UpdateExpenseMutation,
} from "@/lib/graphql/mutation";

const AddExpenseDialogProps = {
	triggerText: "Add Expense",
	header: "Add New Expense",
	buttonText: "Add",
	description:
		"Write the name of the expense you want to add. Click add when you're done.",
	inputLabel: "Name",
};

const getGroupId = (pathname: string): string => {
	const params = pathname.split("/");
	return params[params.length - 1];
};

function ExpensePage(): JSX.Element {
	const pathname = usePathname();
	const { error: expensesError, data: expensesData } = useSuspenseQuery(
		expensesQuery,
		{
			variables: { groupId: getGroupId(pathname as string) },
		},
	);
	const { error: groupError, data: groupData } = useSuspenseQuery(groupQuery, {
		variables: { id: getGroupId(pathname as string) },
	});
	const { error: shopsError, data: shopsData } = useSuspenseQuery(shopsQuery);
	const { error: categoriesError, data: categoriesData } =
		useSuspenseQuery(categoriesQuery);

	if (expensesError != null) return <div>Error! ${expensesError.message}</div>;
	if (groupError != null) return <div>Error! ${groupError.message}</div>;
	if (shopsError != null) return <div>Error! ${shopsError.message}</div>;
	if (categoriesError != null)
		return <div>Error! ${categoriesError.message}</div>;

	const [addExpense] = useMutation(AddExpenseMutation, {
		refetchQueries: [expensesQuery],
	});
	const [updateExpense] = useMutation(UpdateExpenseMutation, {
		refetchQueries: [expensesQuery],
	});
	const [deleteExpense] = useMutation(DeleteExpenseMutation, {
		refetchQueries: [expensesQuery],
	});

	return (
		<div>
			<div
				id="actionBar"
				className="mb-8 px-8 py-2 flex justify-between items-center bg-slate-100"
			>
				<p className="text-xs sm:text-sm">
					Total no. of expense : {(expensesData as any).expenses.length}
				</p>

				<MutationDialog
					baseData={{
						groupId: getGroupId(pathname as string),
						group: (groupData as any).group,
						shops: shopsData,
						categories: categoriesData,
					}}
					mutator={addExpense}
					{...AddExpenseDialogProps}
				/>
			</div>

			<div id="dataTable" className="px-4">
				<DataTable
					columns={columns(
						{ updator: updateExpense, deleter: deleteExpense },
						{
							groupData: (groupData as any).group,
							shopsData,
							categoriesData,
						},
					)}
					data={(expensesData as any).expenses}
				/>
			</div>
		</div>
	);
}

export default ExpensePage;
