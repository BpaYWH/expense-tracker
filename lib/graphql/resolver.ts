import type { PrismaClient } from "@prisma/client";

export interface Context {
	prisma: PrismaClient;
}

export const resolvers = {
	Query: {
		user: async (parent: any, args: any, context: Context) => {
			return await context.prisma.user.findUnique({
				where: {
					id: args.id,
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
		groups: async (parent: any, args: any, context: Context) => {
			return await context.prisma.group.findMany({
				include: {
					users: true,
				},
			});
		},
		expenses: async (parent: any, args: any, context: Context) => {
			return await context.prisma.expense.findMany({
				include: {
					paidUser: true,
					group: true,
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
					price: args.price,
					taxRate: args.taxRate,
					paidAt: args.paidAt,
					paidUser: {
						connect: {
							name: args.paidUser,
						},
					},
					group: {
						connect: {
							name: args.group,
						},
					},
					shop: {
						connect: {
							name: args.shop,
						},
					},
					category: {
						connect: {
							name: args.category,
						},
					},
					consumedUsers: {
						connect: args.consumedUsers.map((name: string) => name),
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
							id: true
						}
					}
				},
			});
			
			const usersToConnect = args.users.filter((name: string) => !originalUsers?.users.map((user: any) => user.name).includes(name))?.map((id: string) => ({ id: Number(id) }));
			const usersToDisconnect = originalUsers?.users.filter((user: any) => !args.users.includes(user.name));

			return await context.prisma.group.update({
				where: {
					id: Number(args.id),
				},
				data: {
					name: args.name,
					users: {
						connect: usersToConnect,
						disconnect: usersToDisconnect
					}
				}
			});
		},
		updateShop: async (parent: any, args: any, context: Context) => {
			return await context.prisma.shop.update({
				where: {
					name: args.name,
				},
				data: {
					name: args.newName,
				},
			});
		},
		updateCategory: async (parent: any, args: any, context: Context) => {
			return await context.prisma.category.update({
				where: {
					name: args.name,
				},
				data: {
					name: args.newName,
				},
			});
		},
		updateExpense: async (parent: any, args: any, context: Context) => {
			return await context.prisma.expense.update({
				where: {
					id: args.id,
				},
				data: {
					item: args.item,
					price: args.price,
					taxRate: args.taxRate,
					paidAt: args.paidAt,
					paidUser: {
						connect: {
							name: args.paidUser,
						},
					},
					group: {
						connect: {
							name: args.group,
						},
					},
					shop: {
						connect: {
							name: args.shop,
						},
					},
					category: {
						connect: {
							name: args.category,
						},
					},
					consumedUsers: {
						connect: args.consumedUsers.map((name: string) => name),
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
