"use client";
import React from "react";
import { format } from "date-fns";
import fromUnixTime from "date-fns/fromUnixTime";
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
import type { Shop } from "../../shops/columns";
import type { Category } from "../../categories/columns";
import type { User, Group } from "./columns";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "../../../../node_modules/lucide-react";

interface Props {
	id: string;
	item: string;
	price: string;
	taxRate: string;
	shop: Shop;
	paidAt: string;
	paidUser: User;
	consumedUsers: User[];
	group: Group;
	category: Category;
	baseData: any;
	updator: any;
	deleter: any;
}

const FormSchema = z.object({
	item: z.string(),
	price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
		message: "Expected number, received a string",
	}),
	taxRate: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
		message: "Expected number, received a string",
	}),
	shopId: z.string().optional(),
	paidAt: z.string(),
	userId: z.string(),
	consumedUsers: z.array(z.string()),
	categoryId: z.string(),
});

const inputFields = [
	{
		name: "item",
		label: "Item",
	},
	{
		name: "price",
		label: "Price",
	},
	{
		name: "taxRate",
		label: "Tax Rate",
	},
];

function ActionsCell({
	id,
	item,
	price,
	taxRate,
	shop,
	paidAt,
	paidUser,
	consumedUsers,
	group,
	category,
	baseData,
	updator,
	deleter,
}: Props): JSX.Element {
	const [confirmName, setConfirmName] = React.useState<string>("");
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			item,
			price: `${price}`,
			taxRate: `${taxRate}`,
			shopId: shop.id,
			paidAt,
			userId: paidUser.id,
			consumedUsers: consumedUsers.map((user: User) => user.id),
			categoryId: category.id,
		},
	});

	function handleSubmit(formData: z.infer<typeof FormSchema>): void {
		updator({
			variables: {
				...formData,
				price: Number(formData.price),
				taxRate: Number(formData.taxRate),
				id,
				groupId: group.id,
			},
		});
	}

	const handleDelete = (): void => {
		deleter({ variables: { id } });
		setConfirmName("");
	};

	return (
		<div className="flex gap-4">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost" className="text-xs sm:text-sm">
						Edit
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Edit Expense</DialogTitle>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<Form {...form}>
							<form
								className="space-y-8"
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onSubmit={form.handleSubmit(handleSubmit)}
							>
								{inputFields.map((inputField) => (
									<FormField
										key={`form-field-${inputField.name}`}
										name={inputField.name as "item" | "price" | "taxRate"}
										control={form.control}
										render={({ field }) => {
											return (
												<FormItem>
													<FormLabel className="text-base">
														{inputField.label}
													</FormLabel>

													<FormControl>
														<Input {...field} />
													</FormControl>

													<FormMessage />
												</FormItem>
											);
										}}
									/>
								))}

								<FormField
									name="shopId"
									control={form.control}
									render={() => (
										<FormItem>
											<FormLabel className="text-base">Shop</FormLabel>
											<FormField
												control={form.control}
												name="shopId"
												render={({ field }) => {
													return (
														<FormItem className="flex flex-row items-start space-x-3 space-y-0">
															<FormControl>
																<Select
																	onValueChange={field.onChange}
																	defaultValue={form.getValues("shopId")}
																>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		{baseData.shopsData.shops.map(
																			(shop: any) => (
																				<SelectItem
																					key={`shop-${shop.id as string}`}
																					value={shop.id}
																				>
																					{shop.name}
																				</SelectItem>
																			),
																		)}
																	</SelectContent>
																</Select>
															</FormControl>
														</FormItem>
													);
												}}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="categoryId"
									control={form.control}
									render={() => (
										<FormItem>
											<FormLabel className="text-base">Category</FormLabel>
											<FormField
												control={form.control}
												name="categoryId"
												render={({ field }) => {
													return (
														<FormItem className="flex flex-row items-start space-x-3 space-y-0">
															<FormControl>
																<Select
																	onValueChange={field.onChange}
																	defaultValue={form.getValues("categoryId")}
																>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		{baseData.categoriesData.categories.map(
																			(category: any) => (
																				<SelectItem
																					key={`category-${category.id as string}`}
																					value={category.id}
																				>
																					{category.name}
																				</SelectItem>
																			),
																		)}
																	</SelectContent>
																</Select>
															</FormControl>
														</FormItem>
													);
												}}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="userId"
									control={form.control}
									render={() => (
										<FormItem>
											<FormLabel className="text-base">Paid By</FormLabel>
											<FormField
												control={form.control}
												name="userId"
												render={({ field }) => {
													return (
														<FormItem className="flex flex-row items-start space-x-3 space-y-0">
															<FormControl>
																<Select
																	onValueChange={field.onChange}
																	defaultValue={form.getValues("userId")}
																>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		{baseData.groupData.users.map(
																			(user: any) => (
																				<SelectItem
																					key={`paidUserId-${user.id as string}`}
																					value={user.id}
																				>
																					{user.name}
																				</SelectItem>
																			),
																		)}
																	</SelectContent>
																</Select>
															</FormControl>
														</FormItem>
													);
												}}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="consumedUsers"
									control={form.control}
									render={() => (
										<FormItem>
											<FormLabel className="text-base mb-4">
												Consumed By
											</FormLabel>
											<ScrollArea
												className="h-[128px] py-2 border rounded-md"
												type="always"
											>
												{baseData.groupData.users.map((user: any) => (
													<FormField
														key={`consumed-users-${user.id as string}`}
														control={form.control}
														name="consumedUsers"
														render={({ field }) => {
															return (
																<FormItem
																	key={user.id}
																	className="flex items-start space-x-3 space-y-0 my-2 mx-4"
																>
																	<FormControl>
																		<Checkbox
																			checked={field.value.includes(user.id)}
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
											</ScrollArea>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="paidAt"
									control={form.control}
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Paid Date</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button variant={"outline"} className="">
															{(field.value !== "") ? (
																format(
																	fromUnixTime(Number(field.value) / 1000),
																	"yyyy-MM-dd",
																)
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>

												<PopoverContent className="w-auto p-0" align="start">
													<Calendar
														mode="single"
														selected={fromUnixTime(Number(field.value))}
														onSelect={field.onChange}
														disabled={(date) =>
															date > new Date() || date < new Date("1900-01-01")
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>

											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<DialogTrigger asChild>
										<Button type="submit">Save</Button>
									</DialogTrigger>
								</DialogFooter>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost">Delete</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Delete Expense</DialogTitle>

						<DialogDescription>
							Delete expense item <b>{item}</b>. Type <i>{item}</i> to confirm.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Item Name
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
								disabled={confirmName !== item}
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
