"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { Search } from "../../../node_modules/lucide-react";

const query = gql`query Users {
  users {
    id
    name
  }
}`;

function UserPage(): JSX.Element {
  const { error, data } = useSuspenseQuery(query);
  if (error != null) return <div>Error! ${error.message}</div>;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("hi search");
  }

  return (
    <div>
      <div id="actionBar" className="flex justify-between items-center px-8 py-2 bg-slate-100">
        <div id="searchBar">
          <form onSubmit={e => { handleSearch(e) }} className="flex gap-2 my-2">
            <Input className="rounded-md px-2 py-1" type="text" placeholder="Search user" name="user" />
            <Button type="submit">
              <Search />
            </Button>
          </form>
        </div>

        <div id="buttonGroup">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Write the name of the user you want to add. Click add when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value="" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div id="sectionSummary" className="flex flex-wrap gap-8 m-8">
        <div className="flex flex-col justify-center gap-4 items-center text-center aspect-square rounded-md shadow-md p-12">
          <p>Total no. of user</p>
          <p>{(data as any).users.length}</p>
        </div>
      </div>

      <div id="dataTable" className="px-4">
          <DataTable columns={columns} data={(data as any).users} />
      </div>
    </div>
  )
}

export default UserPage;