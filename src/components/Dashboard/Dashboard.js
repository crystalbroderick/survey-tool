import { Button, Alert } from "@mui/material";

import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
	const [error, SetError] = useState("");
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		SetError("");

		try {
			await logout();
		} catch {
			SetError("Failed to log out");
		}
		navigate("/login");
	}

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeigh: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Card>
					<Card.Body>
						<h2 className="text-center mb-4">Profile</h2>
						{error && <Alert severity="error">{error}</Alert>}
						<strong>Email: </strong>
						{currentUser.email}
						<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
							Update Profile
						</Link>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-2">
					<Button variant="outlined" onClick={handleLogout}>
						Log Out
					</Button>
				</div>
			</div>
		</Container>
	);
}
