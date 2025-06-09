import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Zap, Trophy, Target, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
	const { signup, login, loading } = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	console.log("email,& password: ", email, password);

	useEffect(() => {
		const token = localStorage.getItem("Gtoken");

		if (token) {
			// navigate the user on dashboard page
			navigate("/dashboard");
		}
	}, [navigate]);

	return (
		<div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center space-y-4">
					<div className="flex items-center justify-center space-x-2">
						<div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
							<Zap className="w-6 h-6 text-gray-900" />
						</div>
						<h1 className="text-2xl font-bold text-white">
							Daily XP
						</h1>
					</div>
					<p className="text-gray-400">
						Your Personal Progress Dashboard
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4 mb-8">
					<div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
						<Trophy className="w-6 h-6 text-lime-400 mb-2" />
						<p className="text-sm text-gray-300">Level Up System</p>
					</div>
					<div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
						<Target className="w-6 h-6 text-blue-400 mb-2" />
						<p className="text-sm text-gray-300">Daily Goals</p>
					</div>
					<div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
						<Calendar className="w-6 h-6 text-orange-400 mb-2" />
						<p className="text-sm text-gray-300">Streak Tracking</p>
					</div>
					<div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
						<Zap className="w-6 h-6 text-purple-400 mb-2" />
						<p className="text-sm text-gray-300">XP Rewards</p>
					</div>
				</div>

				<Card className="bg-gray-900 border-gray-800">
					<Tabs defaultValue="login" className="w-full">
						<TabsList className="grid w-full grid-cols-2 bg-gray-800">
							<TabsTrigger
								value="login"
								className="data-[state=active]:bg-lime-400 data-[state=active]:text-gray-900"
							>
								Login
							</TabsTrigger>
							<TabsTrigger
								value="signup"
								className="data-[state=active]:bg-lime-400 data-[state=active]:text-gray-900"
							>
								Sign Up
							</TabsTrigger>
						</TabsList>

						<TabsContent value="login">
							<CardHeader>
								<CardTitle className="text-white">
									Welcome Back!
								</CardTitle>
								<CardDescription className="text-gray-400">
									Continue your progress journey
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label
											htmlFor="email"
											className="text-gray-300"
										>
											Email
										</Label>
										<Input
											id="email"
											type="email"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											placeholder="jhon@example.com"
											className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="password"
											className="text-gray-300"
										>
											Password
										</Label>
										<Input
											id="password"
											type="password"
											className="bg-gray-800 border-gray-700 text-white"
											onChange={(e) =>
												setPassword(e.target.value)
											}
											value={password}
											required
										/>
									</div>
									<Button
										className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold"
										disabled={loading}
										onClick={() => login(email, password)}
									>
										{loading ? "Logging in..." : "Login"}
									</Button>
								</div>
							</CardContent>
						</TabsContent>

						<TabsContent value="signup">
							<CardHeader>
								<CardTitle className="text-white">
									Start Your Journey!
								</CardTitle>
								<CardDescription className="text-gray-400">
									Create your account and begin earning XP
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label
											htmlFor="name"
											className="text-gray-300"
										>
											Full Name
										</Label>
										<Input
											id="name"
											type="text"
											placeholder="Jhon"
											onChange={(e) =>
												setUsername(e.target.value)
											}
											className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="signup-email"
											className="text-gray-300"
										>
											Email
										</Label>
										<Input
											id="signup-email"
											type="email"
											placeholder="john@example.com"
											onChange={(e) =>
												setEmail(e.target.value)
											}
											className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="signup-password"
											className="text-gray-300"
										>
											Password
										</Label>
										<Input
											id="signup-password"
											type="password"
											onChange={(e) =>
												setPassword(e.target.value)
											}
											className="bg-gray-800 border-gray-700 text-white"
											required
										/>
									</div>
									<Button
										type="submit"
										className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold"
										disabled={loading}
										onClick={() =>
											signup(username, email, password)
										}
									>
										{loading
											? "Creating Account..."
											: "Sign Up"}
									</Button>
								</div>
							</CardContent>
						</TabsContent>
					</Tabs>
				</Card>
			</div>
		</div>
	);
}
