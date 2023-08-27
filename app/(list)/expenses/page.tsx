"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { groupsQuery } from "@/lib/graphql/query";

function ExpensePage(): JSX.Element {
	const { error, data } = useSuspenseQuery(groupsQuery);
	if (error != null) return <div>Error! ${error.message}</div>;

	return (
		<div className="px-8">
			<h1 className="mb-4 text-xl">Choose your group</h1>
			<ul>
				{
					(data as any).groups?.map((group: any) => {
						if (group.users?.length) return (
							<li key={group.name} className="group/group border rounded-md mb-2 hover:bg-slate-50 hover:shadow-md transition">
								<a href={`expenses/${group.id}`}>
									<div className="flex justify-between p-4">
										<p>{group.name}</p>
										<div className="flex justify-end gap-4 invisible group-hover/group:visible transition">
											{
												group.users.slice(0, 4).map((user: any) => 
													<p key={`group-${group.id}-member-${user.id}`}>
														{user.name}
													</p>
												)
											}
											{
												group.users?.length > 4 ?
												"..."
												:
												""
											}
										</div>
									</div>
								</a>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}

export default ExpensePage;
