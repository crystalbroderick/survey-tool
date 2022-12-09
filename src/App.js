import Home from "./components/Home/Home";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router";
import TemplatesView from "./components/templates/TemplatesView";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import TemplateEditor from "./components/templates/Editor";
import Signup from "./components/auth/Signup";
import {
	AuthContext,
	AuthProvider,
	useAuth,
} from "./components/context/AuthContext";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import { useEffect, useState } from "react";
import ForgotPassword from "./components/auth/ForgotPassword";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./custom.scss";

function App() {
	const auth = getAuth();
	const user = auth.currentUser;
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		// check if user is logged in
		auth.onAuthStateChanged((user) => {
			if (user) {
				const uid = user.uid;
				if (window.location.pathname === "/login") {
					window.location = "dashboard";
				}
				setIsLoggedIn(true);
			} else {
				if (window.location.pathname === "/login") return; // User on log in page, no change
				if (window.location.pathname !== "/login") {
					// redirect to log in
					window.location = "login";
				}
				setIsLoggedIn(false);
			}
		});
	}, []);
	return (
		<AuthProvider>
			<div className="App">
				<Header isLoggedIn={isLoggedIn}></Header>
				<Container className="mt-5">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassword />}></Route>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/update-profile" element={<UpdateProfile />} />
						<Route path="/templates" element={<TemplatesView />} />
						<Route path="/template/:id" element={<TemplateEditor />} />
						<Route
							path="*"
							element={
								<main style={{ padding: "1rem" }}>
									<p>ERROR: Page not found!</p>
								</main>
							}
						/>
					</Routes>
				</Container>
			</div>
		</AuthProvider>
	);
}

export default App;
