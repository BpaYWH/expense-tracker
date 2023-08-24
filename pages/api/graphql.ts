import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { typeDefs } from "@/lib/graphql/schema";
import type { Context } from "@/lib/graphql/resolver";
import { resolvers } from "@/lib/graphql/resolver";
import { prisma } from "@/prisma/db";

const apolloServer = new ApolloServer<Context>({
	resolvers,
	typeDefs,
});

export default startServerAndCreateNextHandler(apolloServer, {
	context: async (req, res) => ({ req, res, prisma }),
});
