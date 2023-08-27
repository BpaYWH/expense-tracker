"use client";
import React from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Dialog,
	DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon } from "../../../../node_modules/lucide-react";

type Props = {
   baseData: any,
	mutator: any,
	triggerText: string,
	header: string,
	description: string,
};

const FormSchema = z.object({
   item: z.string(),
   price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string"
   }),
   taxRate: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string"
   }),
   shopId: z.string().optional(),
   paidAt: z.date(),
   userId: z.string(),
   consumedUsers: z.array(z.string()),
   categoryId: z.string()
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
   }
];

function MutationDialog({ baseData, mutator, triggerText, header }: Props) {
   const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
      defaultValues: {
         item: "",
         price: "",
         taxRate: "",
         consumedUsers: []
      }
	})

   const handleSubmit = (submitData: z.infer<typeof FormSchema>) => {
      mutator({
         variables: {
            ...submitData,
            price: Number(submitData.price),
            taxRate: Number(submitData.taxRate),
            groupId: baseData.groupId
         }
      });
      form.reset();
   }

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="text-xs sm:text-sm">{triggerText}</Button>
			</DialogTrigger>
         <DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>{header}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <Form {...form}>
                  <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
                     {
                        inputFields.map((inputField) => 
                           <FormField 
                              key={`form-field-${inputField.name}`}
                              name={inputField.name as "item" | "price" | "taxRate"}
                              control={form.control}
                              render={({ field }) => {
                                 return (
                                 <FormItem>
                                    <FormLabel className="text-base">{inputField.label}</FormLabel>

                                    <FormControl>
                                       <Input {...field} />
                                    </FormControl>

                                    <FormMessage />
                                 </FormItem>
                                 )
                              }}
                           />
                        )
                     }

                     <FormField name="shopId"
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
                                                <Select onValueChange={field.onChange}>
                                                   <FormControl>
                                                      <SelectTrigger>
                                                      <SelectValue />
                                                      </SelectTrigger>
                                                   </FormControl>
                                                   <SelectContent>
                                                      {
                                                         (baseData.shops).shops.map((shop: any) => (
                                                            <SelectItem key={`shop-${shop.id}`} value={shop.id}>{shop.name}</SelectItem>
                                                         ))
                                                      }
                                                   </SelectContent>
                                                </Select>
                                             </FormControl>
                                          </FormItem>
                                       )
                                    }}
                                 />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     
                     <FormField name="categoryId"
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
                                                <Select onValueChange={field.onChange}>
                                                   <FormControl>
                                                      <SelectTrigger>
                                                         <SelectValue />
                                                      </SelectTrigger>
                                                   </FormControl>
                                                   <SelectContent>
                                                      {
                                                         (baseData.categories).categories.map((category: any) => (
                                                            <SelectItem key={`category-${category.id}`} value={category.id}>{category.name}</SelectItem>
                                                         ))
                                                      }
                                                   </SelectContent>
                                                </Select>
                                             </FormControl>
                                          </FormItem>
                                       )
                                    }}
                                 />
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField name="userId"
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
                                                <Select onValueChange={field.onChange}>
                                                   <FormControl>
                                                      <SelectTrigger>
                                                         <SelectValue />
                                                      </SelectTrigger>
                                                   </FormControl>
                                                   <SelectContent>
                                                      {
                                                         baseData.group.users.map((user: any) => (
                                                            <SelectItem key={`paidUserId-${user.id}`} value={user.id}>{user.name}</SelectItem>
                                                         ))
                                                      }
                                                   </SelectContent>
                                                </Select>
                                             </FormControl>
                                          </FormItem>
                                       )
                                    }}
                                 />
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField name="consumedUsers"
                        control={form.control}
                        render={() => (
                           <FormItem>
                              <FormLabel className="text-base mb-4">
                                 Consumed By
                              </FormLabel>
                              <ScrollArea className="h-[128px] py-2 border rounded-md" type="always">
                                 {baseData.group.users.map((user: any) => (
                                    <FormField
                                       key={`consumed-users-${user.id}`}
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
                                                   return checked
                                                   ? field.onChange([...field.value, user.id])
                                                   : field.onChange(
                                                         field.value?.filter(
                                                         (value) => value !== user.id
                                                         )
                                                      )
                                                }}
                                             />
                                             </FormControl>
                                             <FormLabel className="font-normal">
                                                {user.name}
                                             </FormLabel>
                                          </FormItem>
                                       )
                                       }}
                                    />
                                 ))}
                              </ScrollArea>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField name="paidAt"
                        control={form.control}
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                           <FormLabel>Paid Date</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={"outline"}
                                       className=""
                                    >
                                       {field.value ? (
                                          format(field.value, "PPP")
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
                                 selected={field.value}
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

                     <div className="flex justify-end">
                        <Button type="submit">Add & Continue</Button>
                     </div>
                  </form>
               </Form>
            </div>
         </DialogContent>
		</Dialog>
	);
}

export default MutationDialog;
