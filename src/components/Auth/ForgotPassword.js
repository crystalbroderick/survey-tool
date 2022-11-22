import { Alert } from "@mui/material";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { Email } from "@mui/icons-material";

export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for reset instructions");
		} catch {
			setError("Failed to reset password");
		}
		setLoading(false);
	}

	return (
		<>
			<Container
				className="d-flex align-items-center justify-content-center"
				style={{ minHeigh: "100vh" }}
			>
				<div className="w-100" style={{ maxWidth: "400px" }}>
					<Card>
						<Card.Body>
							<h2 className="text-center mb-4">Password Reset</h2>
							{error && <Alert severity="error">{error}</Alert>}
							{message && <Alert severity="success">{message}</Alert>}
							<Form onSubmit={handleSubmit}>
								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Button disabled={loading} className="w-100 mt-3" type="submit">
									Reset Password
								</Button>
							</Form>
							<div className="w-100 text-center mt-3">
								<Link to="/login">Login</Link>
							</div>
						</Card.Body>
					</Card>
					<div className="w-100 text-center mt-2">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
				</div>
			</Container>
		</>
	);
}
