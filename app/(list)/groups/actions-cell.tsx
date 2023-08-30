"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import type { User } from "./columns";
import { usersQuery } from "@/lib/graphql/query";

interface Props {
	id: string;
	name: string;
	inGroupUsers: User[];
	updator: any;
	deleter: any;
}

const FormSchema = z.object({
	users: z.array(z.string()),
});

function ActionsCell({
	id,
	name,
	inGroupUsers,
	updator,
	deleter,
}: Props): JSX.Element {
	const { error, data } = useSuspenseQuery(usersQuery);
	if (error != null) return <div>Error! ${error.message}</div>;

	const [newName, setNewName] = React.useState<string>(name);
	const [confirmName, setConfirmName] = React.useState<string>("");
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			users: inGroupUsers?.map((user) => user.id),
		},
	});

	function handleSubmit(formData: z.infer<typeof FormSchema>): void {
		updator({ variables: { id, name: newName, users: formData.users } });
	}

	const handleEdit = (): void => {
		updator({ variables: { id, name: newName } });
	};

	const handleDelete = (): void => {
		deleter({ variables: { id } });
		setConfirmName("");
	};

	return (
		<div className="flex gap-4">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost">Select Users</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Select Users</DialogTitle>

						<DialogDescription>
							Select users to add to <b>{name}</b>. Click Submit when you&apos;re
							done.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<Form {...form}>
							<form
								className="space-y-8"
								onSubmit={() => form.handleSubmit(handleSubmit)}
							>
								<FormField
									control={form.control}
									name="users"
									render={() => (
										<FormItem>
											<div className="mb-4">
												<FormLabel className="text-base">User list</FormLabel>
											</div>
											{(data as any).users.map((user: User) => (
												<FormField
													key={user.id}
													control={form.control}
													name="users"
													render={({ field }) => {
														return (
															<FormItem
																key={user.id}
																className="flex flex-row items-start space-x-3 space-y-0"
															>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(user.id)}
																		onCheckedChange={(checked) => {
																			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
																			checked
																				? field.onChange([
																						...field.value,
																						user.id,
																				  ])
																				: field.onChange(
																						field.value?.filter(
																							(value) => value !== user.id,
																						),
																				  );
																		}}
																	/>
																</FormControl>
																<FormLabel className="font-normal">
																	{user.name}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<DialogTrigger asChild>
										<Button type="submit">Submit</Button>
									</DialogTrigger>
								</DialogFooter>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost">Edit Name</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Group Info</DialogTitle>

						<DialogDescription>
							Change the name of {name}. Click change when you&apos;re done.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								New name
							</Label>
							<Input
								id="name"
								value={newName}
								onChange={(e) => {setNewName(e.target.value)}}
								className="col-span-3"
							/>
						</div>
					</div>

					<DialogFooter>
						<DialogTrigger asChild>
							<Button type="submit" onClick={handleEdit}>
								Change
							</Button>
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
						<DialogTitle>Delete Group</DialogTitle>

						<DialogDescription>
							Delete group <b>{name}</b>. Type <i>{name}</i> to confirm.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Group Name
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
