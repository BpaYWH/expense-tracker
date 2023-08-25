"use client";
import React from "react";

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

type Props = {
	dataId?: string,
	mutator: any,
	triggerText: string,
	header: string,
	description: string,
	inputLabel: string,
	buttonText: string,
	triggerButtonVariant?: "outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined,
	submitButtonVariant?: "outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined,
};

function MutationDialog({ dataId, mutator, triggerText, header, description, inputLabel, buttonText, triggerButtonVariant = "outline", submitButtonVariant="outline"  }: Props) {
   const [input, setInput] = React.useState("");

   const handleSubmit = () => {
      mutator({ variables: { id: dataId , name: input } });
      setInput("");
   }

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={triggerButtonVariant}>{triggerText}</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{header}</DialogTitle>

					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							{inputLabel}
						</Label>
						<Input id="name" value={input} onChange={(e) => setInput(e.target.value)} className="col-span-3" />
					</div>
				</div>

            <DialogFooter>
               <DialogTrigger asChild>
                  <Button variant={submitButtonVariant} type="submit" onClick={handleSubmit}>{buttonText}</Button>
               </DialogTrigger>
            </DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default MutationDialog;
