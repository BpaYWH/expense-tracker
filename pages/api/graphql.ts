import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { typeDefs } from "@/lib/graphql/schema";
import type { Context } from "@/lib/graphql/resolver";
import { resolvers } from "@/lib/graphql/resolver";
import { prisma } from "@/prisma/db";
import allowCors from "@/lib/graphql/cors";

const apolloServer = new ApolloServer<Context>({
	resolvers,
	typeDefs,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
	context: async (req, res) => ({ req, res, prisma }),
});

export default allowCors(handler);
