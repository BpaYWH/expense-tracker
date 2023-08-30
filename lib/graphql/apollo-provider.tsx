"use client";
import React from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
	NextSSRApolloClient,
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient(): NextSSRApolloClient<any> {
	const httpLink = new HttpLink({
		uri: `${process.env.APP_URL as string}/api/graphql`,
		// uri: "/api/graphql",
	});

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		defaultOptions: {
			query: {
				fetchPolicy: "no-cache",
			},
			watchQuery: {
				fetchPolicy: "no-cache",
			},
		},
		link:
			typeof window === "undefined"
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
	});
}

export function ApolloWrapper({
	children,
}: React.PropsWithChildren): JSX.Element {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
