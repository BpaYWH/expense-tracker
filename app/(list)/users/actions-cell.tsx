"use client";
import React from 'react'
import { useMutation } from "@apollo/client";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { UpdateUserMutation, DeleteUserMutation } from '@/lib/graphql/mutation';

interface Props {
   id: string;
   name: string;
}

//! TODO: updateUser not working
function ActionsCell({ id, name }: Props): JSX.Element {
   const [newName, setNewName] = React.useState<string>(name);
   const [confirmName, setConfirmName] = React.useState<string>("");

	const [updateUser] = useMutation(UpdateUserMutation);
	const [deleteUser] = useMutation(DeleteUserMutation);

   const handleEdit = () => {
      updateUser({ variables: { id, name: newName } });
   }
   
   const handleDelete = () => {
      deleteUser({ variables: { id } });
      setConfirmName("");
   }

  return (
    <div className='flex gap-4'>
      <Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost">Edit</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit User Info</DialogTitle>

					<DialogDescription>
						Change the name of {name}. Click change when you're
						done.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							New name
						</Label>
						<Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} className="col-span-3" />
					</div>
				</div>

            <DialogFooter>
               <DialogTrigger asChild>
                  <Button type="submit" onClick={handleEdit}>Change</Button>
               </DialogTrigger>
            </DialogFooter>
			</DialogContent>
		</Dialog>

      <Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost">Delete</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Delete User</DialogTitle>

					<DialogDescription>
						Delete {name}'s account. Type {name} to confirm.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" value={confirmName} onChange={(e) => setConfirmName(e.target.value)} className="col-span-3" />
					</div>
				</div>

            <DialogFooter>
               <DialogTrigger asChild>
                  <Button variant="destructive" type="submit" onClick={handleDelete} disabled={confirmName !== name}>Delete</Button>
               </DialogTrigger>
            </DialogFooter>
			</DialogContent>
		</Dialog>
   </div>
  )
}

export default ActionsCell