import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import { Statistics } from '@/pages/Statistics';
import { Settings } from '@/pages/Settings';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/statistics" element={<Statistics />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
