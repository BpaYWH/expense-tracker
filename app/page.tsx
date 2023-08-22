"use client"

import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, useMutation } from "@apollo/client";

interface IUser {
  id: number;
  name: string;
};

const query = gql`query Users {
  users {
    id
    name
  }
}`;

const AddUserMutation = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`;

const DeleteUserMutation = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default function Home(): JSX.Element {
  const [name, setName] = React.useState<string>("");
  
  const { error, data } = useSuspenseQuery(query);
  if (error != null) return <div>Error! ${error.message}</div>;

  const [addUser] = useMutation(AddUserMutation, {
    variables: {
      name
    },
    refetchQueries: [query]
  });

  const [deleteUser] = useMutation(DeleteUserMutation, {
    refetchQueries: [query]
  });

  const handleNameChange = (e: any): void => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    if (name === "") return;
    await addUser({ variables: { name } });
    setName("");
  }

  const handleDeleteUser = async (id: number): Promise<void> => {
    await deleteUser({ variables: { id } });
  }

	return (
		<div className="px-4 py-8">
      <h2 className="text-xl mb-4">User list</h2>
      <div className="mb-8">
        {
          (data as any).users.map((user: IUser) => {
            return (
                <div key={`user-${user.id}`} className="flex gap-4">
                  <button onClick={() => {void handleDeleteUser(user.id)}} className="p-1 hover:bg-slate-100 hover:drop-shadow-md rounded-md text-red-500">
                  X
                  </button> 
                  <p className="flex flex-col justify-center">{user.name}</p>
                </div>
              )
          })
        }
      </div>

      <form onSubmit={e => { void handleSubmit(e) }}>
        <input type="text" onChange={e => { handleNameChange(e) }} value={name} className="border border-black p-2 mr-4 rounded-md" placeholder="Name" required>
        </input>

        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add user
        </button>
      </form>
		</div>
	);
}