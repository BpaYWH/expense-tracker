"use client";

import React from "react";
import { usePathname } from "next/navigation";

const pathnameProcessor = (pathname: string | null): string => {
   // return the pathname without the leading slash and capitalize the whole string
   if (pathname === null) return "Expense Tracker";
   return pathname.replace("/", "").toUpperCase();
}

export default function Layout({ children }: { children: React.ReactNode; }): JSX.Element {
   const pathname = usePathname();
	
	return (
		<>
         <h1 className="text-2xl font-semibold mx-8 p-4">
            {pathnameProcessor(pathname)}
         </h1>
         {children}
      </>
	);
}
