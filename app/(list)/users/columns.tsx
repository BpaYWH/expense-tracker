"use client";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  name: string;
}

export const userData: User[] = [
   { id: "1", name: "John" },
   { id: "2", name: "Jane" },
   { id: "3", name: "Joe" }
]

export const columns: ColumnDef<User>[] = [
   {
      accessorKey: "id",
      header: "ID",
   },
   {
      accessorKey: "name",
      header: "Name"
   },
   {
      accessorKey: "actions",
      cell: ( { row }) => {
         const user = row.original;

         return (
            <div className="flex gap-4">
               <button>
                  Edit
               </button>
               <button>
                  Delete
               </button>
            </div>
         );
      }
   }
];
