export const typeDefs = `#graphql
   type User {
      id: ID!
      name: String
      groups: [Group]
   }

   type Group {
      id: ID!
      name: String
      users: [User]
      expenses: [Expense]
   }

   type Expense {
      id: ID!
      item: String!
      price: Float!
      taxRate: Float!
      shop: Shop
      shopId: ID
      paidAt: String
      paidUser: User!
      userId: ID
      consumedUsers: [User]
      group: Group
      groupId: ID
      category: Category
      categoryId: ID
   }

   type Category {
      id: ID!
      name: String
      expenses: [Expense]
   }

   type Shop {
      id: ID!
      name: String
      expenses: [Expense]
   }

   type Query {
      user: User
      users: [User]
      groups: [Group]
      expenses: [Expense]
      shops: [Shop]
      categories: [Category]
   }

   type Mutation {
      addUser(name: String!): User
      addGroup(name: String!): Group
      addShop(name: String!): Shop
      addCategory(name: String!): Category
      addExpense(item: String!, price: Float!, taxRate: Float!, shopId: ID!, paidAt: String, userId: ID, groupId: ID, categoryId: ID, consumedUsers: [ID]): Expense

      updateUser(id: ID!, name: String!): User
      updateGroup(id: ID!, name: String!): Group
      updateShop(id: ID!, name: String!): Shop
      updateCategory(id: ID!, name: String!): Category
      updateExpense(id: ID!, item: String!, price: Float!, taxRate: Float!, shopId: ID!, paidAt: String, userId: ID, groupId: ID, categoryId: ID, consumedUsers: [ID]): Expense

      deleteUser(id: ID!): User
      deleteGroup(id: ID!): Group
      deleteShop(id: ID!): Shop
      deleteCategory(id: ID!): Category
      deleteExpense(id: ID!): Expense
   }
`;
