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
		},
	}
`;

export const groupQuery = gql`
   query Groups {
      groups {
         id
         name
         users {
            id
            name
         }
      },
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