import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import SurveyData from "../../api/surveys.data";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";

function Surveys() {
	const [surveys, setSurveys] = useState([]);
	const { currentUser } = useAuth();
	const uid = currentUser.uid;

	async function deleteSurvey(id) {
		// Remove from database
		try {
			const newSurvey = await SurveyData.deleteSurvey(id);
		} catch {
			console.log("Error removing survey");
		}
		// Remove from survey list
		const newSurveyList = surveys.filter((item) => item.id !== id);
		setSurveys(newSurveyList);
	}

	useEffect(() => {
		const getSurveys = async () => {
			const data = await SurveyData.getUserSurveys(uid);
			setSurveys(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getSurveys();
	}, []);
	return (
		<div>
			<h1 className="page-title">My Surveys</h1>
			<Link to="/templates" className="btn btn-primary mb-3">
				Add Survey
			</Link>
			<ListGroup className="p-2">
				{surveys.map((item) => (
					<ListGroup.Item key={item.id} className="p-3">
						<Row>
							<Col>
								<div className="fw-bold">{item.title}</div>
							</Col>
							<Col md="auto">
								Created: {item.created.toDate().toDateString()}
							</Col>
							<Col
								xs
								lg="2"
								className="d-flex justify-content-end align-items-end"
							>
								<Button variant="danger" onClick={() => deleteSurvey(item.id)}>
									Delete
								</Button>
							</Col>
						</Row>
						{item.desc}{" "}
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
}

export default Surveys;

function DeleteModal({ id, title, show, handleShow }) {
	return (
		<Modal show={show} onHide={handleShow}>
			<Modal.Header closeButton>
				<Modal.Title>Delete Survey: {title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete {title}? This action cannot be undone!
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleShow}>
					Close
				</Button>
				<Button variant="danger" onClick={handleShow}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
