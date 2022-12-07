import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Box, Button, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo/NscLogo.jpg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./context/AuthContext";

function Header({ isLoggedIn }) {
	// const auth = getAuth();
	// const user = auth.currentUser;
	const navigate = useNavigate();
	const { currentUser, logout } = useAuth();
	async function handleLogout() {
		try {
			await logout();
		} catch {
			console.log("failed to sign out");
		}
		navigate("/login");
	}
	return (
		<div>
			<Navbar bg="scblue" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand href="#home">
						<img
							alt="Seattle Colleges logo"
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{" "}
						SLC Survey Creator
					</Navbar.Brand>
					{isLoggedIn && currentUser ? (
						<Nav className="justify-content-end">
							<Nav.Link href="/home">Home</Nav.Link>
							<Nav.Link as={Link} to="/surveys">
								Surveys
							</Nav.Link>
							<Nav.Link as={Link} to="/templates">
								Templates
							</Nav.Link>
							<NavDropdown title="Settings" id="profile-dropdown">
								<NavDropdown.Item as={Link} to="/update-profile">
									Update Profile
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/dashboard">
									My info
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={handleLogout}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					) : (
						<Nav className="justify-content-end">
							<Button
								variant="primary"
								onClick={() => {
									navigate("/login");
								}}
							>
								Login
							</Button>
						</Nav>
					)}
				</Container>
			</Navbar>
		</div>
	);
}

export default Header;
