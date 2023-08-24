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
   mutation updateGroup($id: ID!, $name: String!) {
      updateGroup(id: $id, name: $name) {
         id
			name
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