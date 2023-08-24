"use client";
import React from "react";
import { useMutation } from "@apollo/client";

import { AddUserMutation } from "@/lib/graphql/mutation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

function AddUserDialog() {
   const [name, setName] = React.useState("");

	const [addUser] = useMutation(AddUserMutation, {
		variables: {
			name,
		},
	});

   const handleSubmit = () => {
      addUser({ variables: { name } });
      setName("");
   }

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add User</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New User</DialogTitle>

					<DialogDescription>
						Write the name of the user you want to add. Click add when you're
						done.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
					</div>
				</div>

            <DialogFooter>
               <DialogTrigger asChild>
                  <Button type="submit" onClick={handleSubmit}>Add</Button>
               </DialogTrigger>
            </DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default AddUserDialog;
