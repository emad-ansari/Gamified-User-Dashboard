import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BarChart2, Settings, LogOut, Zap } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/useToast";

export const SideBar: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const toast = useToast();

	const handleLogout = () => {
		api.auth.logout();
		navigate("/");
		toast.showToast("Logged out successfully", "success");
	};

	const isActive = (path: string) => location.pathname === path;

	const menuItems = [
		{ icon: Home, label: "Dashboard", path: "/dashboard" },
		{ icon: BarChart2, label: "Statistics", path: "/statistics" },
		{ icon: Settings, label: "Settings", path: "/settings" },
	];

	return (
		<div className="fixed left-0 top-0 h-full w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 space-y-4">
			<div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
				<Zap className="w-6 h-6 text-gray-900" />
			</div>
			<div className="flex flex-col space-y-3">
				{menuItems.map((item) => {
					const Icon = item.icon;
					return (
						<Button
							key={item.path}
							variant="ghost"
							size="icon"
							className={`  text-gray-400 hover:text-white hover:bg-gray-800 ${
								isActive(item.path) &&
								"bg-gray-800 text-gray-400 hover:bg-gray-800"
							}`}
							onClick={() => navigate(item.path)}
						>
							<Icon className="w-5 h-5" />
						</Button>
					);
				})}
			</div>

			<Button
				variant="ghost"
				size="icon"
				className=" text-red-400 hover:text-red-300 hover:bg-gray-800"
				onClick={handleLogout}
			>
				<LogOut className="w-5 h-5" />
			</Button>
		</div>
	);
};
