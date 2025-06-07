import { Button } from "@/components/ui/button";
import {
	Zap,
	Trophy,
	Calendar,
	Settings,
	Target,
	BookOpen,
} from "lucide-react";

export function SideBar() {
	return (
		<div className="fixed left-0 top-0 h-full w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 space-y-4">
			<div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
				<Zap className="w-6 h-6 text-gray-900" />
			</div>
			<div className="flex flex-col space-y-3">
				<Button
					variant="ghost"
					size="icon"
					className="text-gray-400 hover:text-white hover:bg-gray-800"
				>
					<Target className="w-5 h-5" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="text-gray-400 hover:text-white hover:bg-gray-800"
				>
					<Trophy className="w-5 h-5" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="text-gray-400 hover:text-white hover:bg-gray-800"
				>
					<Calendar className="w-5 h-5" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="text-gray-400 hover:text-white hover:bg-gray-800"
				>
					<BookOpen className="w-5 h-5" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="text-gray-400 hover:text-white hover:bg-gray-800"
				>
					<Settings className="w-5 h-5" />
				</Button>
			</div>
		</div>
	);
}
