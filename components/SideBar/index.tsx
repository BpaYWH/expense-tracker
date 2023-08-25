import React from "react";
import {
	BarChartBig,
	Component,
	DollarSign,
	Moon,
	Store,
	Sun,
	Users,
	User,
} from "../../node_modules/lucide-react";

function SideBar(): JSX.Element {
	return (
		<div className="flex flex-col justify-between py-4 h-screen border-r shadow-xl">
			<div id="content">
				<div className="w-1/2 min-w-[24px] mx-auto mb-4">
					<a href="/">
						<img src="/images/logo.svg" alt="logo" className="py-1 rounded-2xl aspect-square" />
					</a>
				</div>

				<div id="content" className="flex flex-col border-t">
					<a href="/users" className="py-4 flex justify-center w-full hover:bg-slate-100">
						<User />
					</a>
					<a href="/groups" className="py-4 flex justify-center w-full hover:bg-slate-100">
						<Users />
					</a>
					<a href="/shops" className="py-4 flex justify-center w-full hover:bg-slate-100">
						<Store />
					</a>
					<a href="/categories" className="py-4 flex justify-center w-full hover:bg-slate-100">
						<Component />
					</a>
					<a href="/expenses" className="py-4 flex justify-center w-full hover:bg-slate-100">
						<DollarSign />
					</a>
					<a href="/summary" className="py-4 flex justify-center w-full hover:bg-slate-100">
						<BarChartBig />
					</a>
				</div>
			</div>

			<div id="footer" className="pt-4 flex flex-col items-center border-t">
				<button>
					<Sun />
				</button>
				{/* <button><Moon /></button> */}
			</div>
		</div>
	);
}

export default SideBar;
