import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
	await prisma.user.create({
		data: {
			name: "Alice",
			groups: {
				create: {
					name: "Group 1",
				},
			},
		},
	});

	await prisma.user.create({
		data: {
			name: "Bob",
			groups: {
				create: {
					name: "Group 2",
				},
			},
		},
	});

	await prisma.user.create({
		data: {
			name: "Charles",
		},
	});

	await prisma.category.createMany({
		data: [
			{
				name: "Grocery",
			},
			{
				name: "Utility",
			},
		],
	});

	await prisma.shop.createMany({
		data: [
			{
				name: "TNT",
			},
			{
				name: "Walmart",
			},
			{
				name: "City of Toronto",
			},
		],
	});

	await prisma.expense.create({
		data: {
			item: "Pasta",
			price: 1.99,
			taxRate: 0,
			shop: {
				connect: {
					name: "Walmart",
				},
			},
			paidAt: new Date(),
			paidUser: {
				connect: {
					name: "Alice",
				},
			},
			group: {
				connect: {
					name: "Group 1",
				},
			},
			category: {
				connect: {
					name: "Grocery",
				},
			},
			consumedUsers: {
				connect: [
					{
						name: "Alice",
					},
				],
			},
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
