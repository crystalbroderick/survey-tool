import Home from "./components/Home/Home";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router";
import TemplatesView from "./components/Templates/Templates";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Template from "./components/Templates/Template";
import Signup from "./components/Auth/Signup";
import { AuthProvider, useAuth } from "./components/Contexts/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import { useEffect } from "react";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				const uid = user.uid;
				console.log(uid);
			} else {
				if (window.location.pathname === "/login") return; // User on log in page, no change
				if (window.location.pathname !== "/login") {
					// redirect to log in
					window.location = "login";
				}
			}
		});
	});
	return (
		<AuthProvider>
			<div className="App">
				<Container>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassword />}></Route>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/update-profile" element={<UpdateProfile />} />
						<Route path="Templates" exact element={<TemplatesView />} />
						<Route path="Templates/:id" element={<Template />} />
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
