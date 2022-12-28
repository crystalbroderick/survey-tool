import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import SurveyData from "../../api/surveys.data";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Surveys() {
	const [surveys, setSurveys] = useState([]);
	const { currentUser } = useAuth();
	const uid = currentUser.uid;

	const previewSurvey = (e) => {
		console.log(e.target.value);
	};

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
	}, [uid]);
	return (
		<div>
			<h1 className="page-title">My Surveys</h1>
			<Link to="/templates" className="btn btn-primary mb-3">
				Add Survey
			</Link>
			<ListGroup className="p-2 ">
				{surveys.map((item) => (
					<ListGroup.Item
						key={item.id}
						bg="neutral"
						className="p-3 shadow p-3 mb-5 rounded h-7"
					>
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
								className="d-flex justify-content-between align-items-end"
							>
								<Button
									variant="primary"
									value={item.id}
									onClick={(e) => previewSurvey(e)}
								>
									Edit
								</Button>
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
