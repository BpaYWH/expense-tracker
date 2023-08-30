"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useLazyQuery } from "@apollo/client";

import { groupQuery } from "@/lib/graphql/query";
import { calculateTransaction } from "@/lib/transaction/util";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "../../../node_modules/lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const getGroupId = (pathname: string): string => {
	const params = pathname.split("/");
	return params[params.length - 1];
};

//! TODO: Separate Date Range picker search
//! TODO: Add graph summary e.g. Categories & Shops Distribution, other data in graph,
function GroupSummaryPage(): JSX.Element {
	const pathname = usePathname();
	const [getGroup, { error: groupError, data: groupData }] =
		useLazyQuery(groupQuery);

	const [result, setResult] = React.useState<any>();
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 30),
	});

	const handleSearch = async (): Promise<void> => {
      if (pathname == null) {
			console.error("No pathname found");
			return;
		}

		await getGroup({
			variables: {
				id: getGroupId(pathname),
				startDate: date?.from,
				endDate: date?.to,
			},
		});

		if (groupError != null) {
			console.error(groupError.message);
		}
	};

	React.useEffect(() => {
		const newResult = calculateTransaction(
			groupData?.group.users,
			groupData?.group.expenses,
		);
		setResult(newResult);
	}, [groupData]);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold">GroupSummary</h1>
			<div id="date-range-picker" className="mt-8">
				<h3 className="text-lg mb-4">Choose date range</h3>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant={"outline"}
							className={cn(
								"w-[300px] justify-start text-left font-normal",
								(date != null) && "text-muted-foreground",
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{
                        ((date?.from) != null) ? (
								(date.to != null) ? (
									<>
										{format(date.from, "LLL dd, y")} -{" "}
										{format(date.to, "LLL dd, y")}
									</>
								) : (
									format(date.from, "LLL dd, y")
								)
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={setDate}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>
				<div className="mt-4">
					<Button variant="outline" onClick={() => {void handleSearch()}}>
						Search
					</Button>
				</div>
			</div>

			<div id="result" className="mt-8" hidden={result == null}>
				<h3 className="text-lg mb-4 border-b">Result</h3>
				<div className="text-md mb-4">
					<p>Total Spent: {Number(result?.total).toFixed(2)}</p>
					<p>No. of expenses: {groupData?.group?.expenses?.length}</p>
				</div>

				<div className="mb-4 flex flex-col gap-2">
					<h3 className="border-b">Members</h3>
					{result?.moneyMap != null &&
						Object.keys(result?.moneyMap).map((member) => {
							const diff =
								Number(result?.moneyMap[member].shouldPay) -
								Number(result?.moneyMap[member].paid);
							return (
								<div key={member} className="flex gap-4">
									<h3>{member}</h3>
									<p>
										<b>Paid:</b>{" "}
										{Number(result?.moneyMap[member].paid).toFixed(2)}
									</p>
									<p>
										<b>Should Paid:</b>{" "}
										{Number(result?.moneyMap[member].shouldPay).toFixed(2)}
									</p>
									<p>
										<b>{diff > 0 ? "Pay" : "Receive"}:</b>{" "}
										{Math.abs(Number(diff.toFixed(2)))}
									</p>
								</div>
							);
						})}
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="border-b">Transactions</h3>
					{result?.transactions?.map((item: any, index: number) => (
						<div key={index} className="flex gap-4">
							<p>
								<b>From:</b> {item.from}
							</p>
							<p>
								<b>To:</b> {item.to}
							</p>
							<p>
								<b>Amount:</b> {Number(item.amount).toFixed(2)}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default GroupSummaryPage;
