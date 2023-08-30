"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { groupsQuery } from "@/lib/graphql/query";

function SummaryPage(): JSX.Element {
	const { error: groupsError, data: groupsData } =
		useSuspenseQuery(groupsQuery);
	if (groupsError != null) return <div>Error: {groupsError.message}</div>;

	return (
		<div className="py-4 px-2">
			<h1 className="mx-8 text-2xl font-semibold">Summary</h1>

			<div className="mx-8 mt-4">
				<h2 className="my-4 text-xl font-semibold">Choose your group</h2>
				<ul>
					{(groupsData as any).groups?.map((group: any) => {
						if (group.users?.length > 0)
							return (
								<li
									key={group.name}
									className="group/group border rounded-md mb-4 hover:bg-slate-50 hover:shadow-md transition"
								>
									<a href={`summary/${group.id as string}`}>
										<div className="flex justify-between p-4">
											<p>{group.name}</p>
											<div className="flex justify-end gap-4 invisible group-hover/group:visible transition">
												{group.users.slice(0, 4).map((user: any) => (
													<p key={`group-${group.id as string}-member-${user.id as string}`}>
														{user.name}
													</p>
												))}
												{group.users?.length > 4 ? "..." : ""}
											</div>
										</div>
									</a>
								</li>
							);
						return null;
					})}
				</ul>
			</div>
		</div>
	);
}

export default SummaryPage;
