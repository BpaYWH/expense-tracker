import { gql } from "@apollo/client";

export const usersQuery = gql`
	query Users {
		users {
			id
			name
		}
	}
`;

export const groupQuery = gql`
   query Groups {
      groups {
         id
         name
      }
   }
`;

