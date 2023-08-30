type IMoneyMap = Record<string, {
		shouldPay: number;
		paid: number;
		diff: number;
	}>;;

export function calculateTransaction(users: any, expenseData: any): any {
	if (expenseData == null) return null;

	const moneyMap: IMoneyMap = {};
	users.forEach((user: any) => {
		moneyMap[user.name] = {
			shouldPay: 0,
			paid: 0,
			diff: 0,
		};
	});

	const numOfPeople = Object.keys(moneyMap).length;

	expenseData.forEach((expense: any) => {
		const sharedCount: number = expense.consumedUsers.length;
		const finalPrice: number = expense.price * (1 + expense.taxRate / 100);
		moneyMap[expense.paidUser.name].paid += finalPrice;

		if (sharedCount === 0) {
			Object.keys(moneyMap).forEach((person) => {
				moneyMap[person].shouldPay += finalPrice / numOfPeople;
			});
			return;
		}

		const individualShare = finalPrice / sharedCount;
		expense.consumedUsers.forEach((consumer: any) => {
			moneyMap[consumer].shouldPay += individualShare;
		});
	});

	Object.keys(moneyMap).forEach((person) => {
		moneyMap[person].diff = moneyMap[person].paid - moneyMap[person].shouldPay;
	});

	const transactions: any[] = [];
	let total = 0;
	let paid = 0;
	Object.keys(moneyMap).forEach((debtor) => {
		total += moneyMap[debtor].shouldPay;
		paid += moneyMap[debtor].paid;
		while (moneyMap[debtor].diff < 0) {
			const creditor = Object.keys(moneyMap).find(
				(person) => moneyMap[person].diff > 0,
			);
			if (creditor == null) break;

			const amountToTransfer = Math.min(
				-moneyMap[debtor].diff,
				moneyMap[creditor].diff,
			);

			transactions.push({
				from: debtor,
				to: creditor,
				amount: amountToTransfer,
			});

			moneyMap[debtor].diff += amountToTransfer;
			moneyMap[creditor].diff -= amountToTransfer;
		}
	});

	return {
		total,
		paid,
		transactions,
		moneyMap,
	};
}
