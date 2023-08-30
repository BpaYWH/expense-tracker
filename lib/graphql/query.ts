import { gql } from "@apollo/client";

export const usersQuery = gql`
	query Users {
		users {
			id
			name
			groups {
				id
				name
			}
		}
	}
`;

export const groupQuery = gql`
	query Group($id: ID!, $startDate: String, $endDate: String) {
		group(id: $id, startDate: $startDate, endDate: $endDate) {
			id
			name
			users {
				id
				name
			}
			expenses {
				id
				item
				price
				taxRate
				shop {
					id
					name
				}
				paidAt
				paidUser {
					id
					name
				}
				consumedUsers {
					id
					name
				}
				group {
					id
					name
				}
				category {
					id
					name
				}
			}
		}
	}
`;

export const groupsQuery = gql`
	query Groups {
		groups {
			id
			name
			users {
				id
				name
			}
		}
		users {
			id
			name
		}
	}
`;

export const shopsQuery = gql`
	query Shops {
		shops {
			id
			name
		}
	}
`;

export const categoriesQuery = gql`
	query Category {
		categories {
			id
			name
		}
	}
`;

export const expensesQuery = gql`
	query Expenses($groupId: ID!) {
		expenses(groupId: $groupId) {
			id
			item
			price
			taxRate
			shop {
				id
				name
			}
			paidAt
			paidUser {
				id
				name
			}
			consumedUsers {
				id
				name
			}
			group {
				id
				name
			}
			category {
				id
				name
			}
		}
	}
`;
