import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ApolloWrapper } from "@/lib/graphql/apollo-provider";
import SideBar from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Expense Tracker",
	description: "Track your monthly expenses",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html>
			<body className={`${inter.className} grid grid-cols-12`}>
				<SideBar />

				<ApolloWrapper>
					<div className="col-span-10 md:col-span-11">{children}</div>
				</ApolloWrapper>
			</body>
		</html>
	);
}
