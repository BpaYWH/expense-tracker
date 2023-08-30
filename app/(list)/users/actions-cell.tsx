"use client";
import React from "react";
import { Button } from "@/components/ui/button";
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
import MutationDialog from "@/components/mutation-dialog";

interface Props {
	id: string;
	name: string;
	updator: any;
	deleter: any;
}

const UpdateUserDialogProps = {
	triggerText: "Edit",
	header: "Edit User Info",
	buttonText: "Save",
	inputLabel: "Name",
};

function ActionsCell({ id, name, updator, deleter }: Props): JSX.Element {
	const [confirmName, setConfirmName] = React.useState<string>("");

	const handleDelete = (): void => {
		deleter({ variables: { id } });
		setConfirmName("");
	};

	return (
		<div className="flex gap-4">
			<MutationDialog
				dataId={id}
				mutator={updator}
				triggerButtonVariant="ghost"
				description={`Change the name of ${name}. Click save when you're done.`}
				{...UpdateUserDialogProps}
			/>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost">Delete</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Delete User</DialogTitle>

						<DialogDescription>
							Delete {name}&apos;s account. Type {name} to confirm.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								value={confirmName}
								onChange={(e) => {setConfirmName(e.target.value)}}
								className="col-span-3"
							/>
						</div>
					</div>

					<DialogFooter>
						<DialogTrigger asChild>
							<Button
								variant="destructive"
								type="submit"
								onClick={handleDelete}
								disabled={confirmName !== name}
							>
								Delete
							</Button>
						</DialogTrigger>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default ActionsCell;
