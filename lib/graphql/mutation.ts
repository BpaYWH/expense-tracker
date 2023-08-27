import { gql } from "@apollo/client";

export const AddUserMutation = gql`
	mutation addUser($name: String!) {
		addUser(name: $name) {
			name
		}
	}
`;
export const UpdateUserMutation = gql`
	mutation updateUser($id: ID!, $name: String!) {
      updateUser(id: $id, name: $name) {
         id
			name
		}
	}
`;
//! TODO: delete referenced groups & expenses / Cannot delete user w/ expenses referenced
export const DeleteUserMutation = gql`
	mutation deleteUser($id: ID!) {
		deleteUser(id: $id) {
			id
		}
	}
`;

export const AddGroupMutation = gql`
   mutation addGroup($name: String!) {
      addGroup(name: $name) {
         id
			name
		}
	}
`;
export const UpdateGroupMutation = gql`
   mutation updateGroup($id: ID!, $name: String!, $users: [ID]) {
      updateGroup(id: $id, name: $name, users: $users) {
         id
			name
			users {
				id
			}
		}
	}
`;
export const DeleteGroupMutation = gql`
   mutation deleteGroup($id: ID!) {
      deleteGroup(id: $id) {
         id
		}
	}
`;

export const AddShopMutation = gql`
   mutation addShop($name: String!) {
      addShop(name: $name) {
         id
			name
		}
	}
`;
export const UpdateShopMutation = gql`
   mutation updateShop($id: ID!, $name: String!) {
      updateShop(id: $id, name: $name) {
         id
			name
		}
	}
`;
export const DeleteShopMutation = gql`
   mutation deleteShop($id: ID!) {
      deleteShop(id: $id) {
         id
		}
	}
`;

export const AddCategoryMutation = gql`
   mutation addCategory($name: String!) {
      addCategory(name: $name) {
         id
			name
		}
	}
`;
export const UpdateCategoryMutation = gql`
   mutation updateCategory($id: ID!, $name: String!) {
      updateCategory(id: $id, name: $name) {
         id
			name
		}
	}
`;
export const DeleteCategoryMutation = gql`
   mutation deleteCategory($id: ID!) {
      deleteCategory(id: $id) {
         id
		}
	}
`;

export const AddExpenseMutation = gql`
   mutation addExpense($item: String!, $price: Float!, $taxRate: Float!, $shopId: ID!, $paidAt: String, $userId: ID!, $consumedUsers: [ID], $groupId: ID!, $categoryId: ID!) {
      addExpense(item: $item, price: $price, taxRate: $taxRate, shopId: $shopId, paidAt: $paidAt, userId: $userId, consumedUsers: $consumedUsers, groupId: $groupId, categoryId: $categoryId) {
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
			userId
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
export const UpdateExpenseMutation = gql`
   mutation updateExpense($id: ID!, $item: String!, $price: Float!, $taxRate: Float!, $shopId: ID!, $paidAt: String, $userId: ID!, $consumedUsers: [ID], $groupId: ID!, $categoryId: ID!) {
      updateExpense(id: $id, item: $item, price: $price, taxRate: $taxRate, shopId: $shopId, paidAt: $paidAt, userId: $userId, consumedUsers: $consumedUsers, groupId: $groupId, categoryId: $categoryId) {
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
			userId
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
export const DeleteExpenseMutation = gql`
   mutation deleteExpense($id: ID!) {
      deleteExpense(id: $id) {
         id
		}
	}
`;