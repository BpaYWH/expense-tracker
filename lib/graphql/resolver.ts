import type { PrismaClient } from "@prisma/client";
import fromUnixTime from "date-fns/fromUnixTime";

export interface Context {
	prisma: PrismaClient;
}

export const resolvers = {
	Query: {
		user: async (parent: any, args: any, context: Context) => {
			return await context.prisma.user.findUnique({
				where: {
					id: Number(args.id),
				},
				include: {
					groups: true,
				},
			});
		},
		users: async (parent: any, args: any, context: Context) => {
			return await context.prisma.user.findMany({
				include: {
					groups: true,
				},
			});
		},
		group: async (parent: any, args: any, context: Context) => {
			return await context.prisma.group.findUnique({
				where: {
					id: Number(args.id),
				},
				include: {
					users: true,
					expenses: {
						where: {
							paidAt: {
								gte: args.startDate,
								lte: args.endDate,
							},
						},
						include: {
							paidUser: true,
							shop: true,
							category: true,
							consumedUsers: true,
						},
					},
				},
			});
		},
		groups: async (parent: any, args: any, context: Context) => {
			return await context.prisma.group.findMany({
				include: {
					users: true,
				},
			});
		},
		expenses: async (parent: any, args: any, context: Context) => {
			return await context.prisma.expense.findMany({
				where: {
					group: {
						id: Number(args.groupId),
					},
				},
				include: {
					paidUser: true,
					group: {
						include: {
							users: true,
						},
					},
					shop: true,
					category: true,
					consumedUsers: true,
				},
			});
		},
		shops: async (parent: any, args: any, context: Context) => {
			return await context.prisma.shop.findMany();
		},
		categories: async (parent: any, args: any, context: Context) => {
			return await context.prisma.category.findMany();
		},
	},
	Mutation: {
		addUser: async (parent: any, args: any, context: Context) => {
			return await context.prisma.user.create({
				data: {
					name: args.name,
				},
			});
		},
		addGroup: async (parent: any, args: any, context: Context) => {
			return await context.prisma.group.create({
				data: {
					name: args.name,
				},
			});
		},
		addShop: async (parent: any, args: any, context: Context) => {
			return await context.prisma.shop.create({
				data: {
					name: args.name,
				},
			});
		},
		addCategory: async (parent: any, args: any, context: Context) => {
			return await context.prisma.category.create({
				data: {
					name: args.name,
				},
			});
		},
		addExpense: async (parent: any, args: any, context: Context) => {
			return await context.prisma.expense.create({
				data: {
					item: args.item,
					price: Number(args.price),
					taxRate: Number(args.taxRate),
					// paidAt: fromUnixTime(args.paidAt),
					paidAt: args.paidAt,
					paidUser: {
						connect: {
							id: Number(args.userId),
						},
					},
					group: {
						connect: {
							id: Number(args.groupId),
						},
					},
					shop: {
						connect: {
							id: Number(args.shopId),
						},
					},
					category: {
						connect: {
							id: Number(args.categoryId),
						},
					},
					consumedUsers: {
						connect: args.consumedUsers?.map((id: string) => ({
							id: Number(id)
						})),
					},
				},
			});
		},
		updateUser: async (parent: any, args: any, context: Context) => {
			return await context.prisma.user.update({
				where: {
					id: Number(args.id),
				},
				data: {
					name: args.name,
				},
			});
		},
		updateGroup: async (parent: any, args: any, context: Context) => {
			const originalUsers = await context.prisma.group.findFirst({
				where: {
					id: Number(args.id),
				},
				include: {
					users: {
						select: {
							id: true,
						},
					},
				},
			});

			const usersToConnect = args.users
				.filter(
					(name: string) =>
						!((originalUsers?.users.map((user: any) => user.name).includes(name)) ?? false),
				)
				?.map((id: string) => ({ id: Number(id) }));
			const usersToDisconnect = originalUsers?.users.filter(
				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
				(user: any) => !(args.users.includes(user.name)),
			);

			return await context.prisma.group.update({
				where: {
					id: Number(args.id),
				},
				data: {
					name: args.name,
					users: {
						connect: usersToConnect,
						disconnect: usersToDisconnect,
					},
				},
			});
		},
		updateShop: async (parent: any, args: any, context: Context) => {
			return await context.prisma.shop.update({
				where: {
					id: Number(args.id),
				},
				data: {
					name: args.name,
				},
			});
		},
		updateCategory: async (parent: any, args: any, context: Context) => {
			return await context.prisma.category.update({
				where: {
					id: Number(args.id),
				},
				data: {
					name: args.name,
				},
			});
		},
		updateExpense: async (parent: any, args: any, context: Context) => {
			return await context.prisma.expense.update({
				where: {
					id: Number(args.id),
				},
				data: {
					item: args.item,
					price: Number(args.price),
					taxRate: Number(args.taxRate),
					paidAt: fromUnixTime(Number(args.paidAt) / 1000),
					paidUser: {
						connect: {
							id: Number(args.userId),
						},
					},
					shop: {
						connect: {
							id: Number(args.shopId),
						},
					},
					category: {
						connect: {
							id: Number(args.categoryId),
						},
					},
					consumedUsers: {
						connect: args.consumedUsers?.map((id: string) => ({
							id: Number(id)
						})),
					},
				},
			});
		},
		deleteUser: async (parent: any, args: any, context: Context) => {
			return await context.prisma.user.delete({
				where: {
					id: Number(args.id),
				},
			});
		},
		deleteGroup: async (parent: any, args: any, context: Context) => {
			return await context.prisma.group.delete({
				where: {
					id: Number(args.id),
				},
			});
		},
		deleteShop: async (parent: any, args: any, context: Context) => {
			return await context.prisma.shop.delete({
				where: {
					id: Number(args.id),
				},
			});
		},
		deleteCategory: async (parent: any, args: any, context: Context) => {
			return await context.prisma.category.delete({
				where: {
					id: Number(args.id),
				},
			});
		},
		deleteExpense: async (parent: any, args: any, context: Context) => {
			return await context.prisma.expense.delete({
				where: {
					id: Number(args.id),
				},
			});
		},
	},
};
