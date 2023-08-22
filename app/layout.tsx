import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ApolloWrapper } from "@/lib/graphql/apollo-provider";

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
			<body className={inter.className}>
				<ApolloWrapper>
					{children}
				</ApolloWrapper>
			</body>
		</html>
	);
}
