import React from "react";
import { BarChartBig, Component, DollarSign, Moon, Store, Sun, Users, User } from "../../node_modules/lucide-react";

function SideBar(): JSX.Element {
  return (
    <div className="flex flex-col justify-between p-4 h-screen border-r shadow-xl">
      <div>
         <div id="header" className="mb-8">
            <a href="/">Expense Tracker</a>      
         </div>

         <div id="content" className="flex flex-col gap-4">
            <a href="/users"><User /></a>
            <a href="/groups"><Users /></a>
            <a href="/shops"><Store /></a>
            <a href="/categories"><Component /></a>
            <a href="/expenses"><DollarSign /></a>
            <a href="/summary"><BarChartBig /></a>
         </div>
      </div>

      <div id="footer">
         <button><Sun /></button>
         {/* <button><Moon /></button> */}
      </div>
    </div>
  )
}

export default SideBar