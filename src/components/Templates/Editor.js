import React, { useState, useEffect } from "react";
import {
	Navigate,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import TemplateData from "../../api/templates.data";
import SurveyData from "../../api/surveys.data";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth, AuthContext } from "../context/AuthContext";
import { addDoc, Timestamp, collection } from "firebase/firestore";
import db from "../../firebase.config.js";
import "firebase/firestore";

function TemplateEditor() {
	const { id } = useParams();
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [templateLoading, setTemplateLoading] = useState(true);
	const [errors, setErrors] = useState({});
	const [validated, setValidated] = useState(false);
	const [template, setTemplate] = useState({});
	const navigate = useNavigate();
	const { currentUser } = useAuth();
	const [page, setPage] = useState(template.title);

	function handleInfoChange(e) {
		const { name, value } = e.target;
		setTemplate((curr) => {
			return { ...curr, [name]: value };
		});
	}

	const updateQuestion = (id, name, value) => {
		const item = questions.find((x) => x.id === id);
		const updatedItem = { ...item, [name]: value }; // update question / type
		const newQuestion = [...questions];
		newQuestion.splice(questions.indexOf(item), 1, updatedItem);
		setQuestions(newQuestion);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const allErrors = {};
		// validation
		if (template.title === "") {
			allErrors.title = "Please enter a title";
		}
		// checks for undefined, not all templates have descriptions
		if (template.desc === "" || typeof template.desc === "undefined") {
			allErrors.desc = "Please enter a description";
		}
		const isEmpty = Object.keys(allErrors).length === 0;
		if (!isEmpty) {
			setErrors(allErrors);
			setValidated(false);
		} else {
			setValidated(true);
			addSurvey();
		}
	};

	async function addSurvey() {
		const surveysRef = collection(db, "surveys");
		const newSurvey = {
			title: template.title,
			desc: template.desc,
			uid: currentUser.uid,
			created: Timestamp.now(),
		};
		//create new survey
		const docRef = await addDoc(surveysRef, newSurvey);

		if (docRef) {
			//add questions to survey
			await questions
				.forEach((doc) => {
					console.log("docs:", doc);
					const questionsRef = collection(
						db,
						"surveys",
						docRef.id,
						"questions"
					);
					const ref = addDoc(questionsRef, {
						title: doc.title,
						type: doc.type,
					});
					navigate("/surveys");
				})
				.catch((e) => console.log("Error adding questions..", e));
		}
	}

	useEffect(() => {
		const getTemplateInfo = async () => {
			const docSnap = await TemplateData.getTemplate(id);
			if (docSnap.exists()) {
				setTemplate({ title: docSnap.data().title, desc: docSnap.data().desc });
			} else {
				console.log("No such document!");
			}
			setTemplateLoading(false);
		};
		const getQuestions = async () => {
			const querySnapshot = await TemplateData.getTemplateQuestions(id);
			querySnapshot.forEach((doc) => {
				setQuestions(
					querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
				);
			});
			setLoading(false);
		};
		getTemplateInfo();
		getQuestions();
	}, [id]);

	return (
		<>
			<div>
				<h1 className="page-title">Create a New Survey</h1>
				{loading && templateLoading ? null : (
					<Form validated={validated} onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="title.ControlInput">
							<Form.Label>Survey Title</Form.Label>
							<Form.Control
								type="input"
								name="title"
								value={template.title}
								onChange={handleInfoChange}
								isInvalid={!!errors.title}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a title
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-3" controlId="description.ControlInput">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="input"
								name="desc"
								value={template.desc || ""}
								onChange={handleInfoChange}
								isInvalid={!!errors.desc}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a description
							</Form.Control.Feedback>
						</Form.Group>

						<Stack gap={3}>
							{questions.map((question, i) => (
								<div className="bg-light border p-3" key={question.id}>
									<QuestionItem
										id={question.id}
										qNum={i + 1}
										question={question.title}
										type={question.type}
										updateQuestion={updateQuestion}
										key={question.id}
									></QuestionItem>
								</div>
							))}
						</Stack>
						<Button
							variant="primary"
							type="submit"
							className="m-3"
							onSubmit={(e) => handleSubmit(e)}
						>
							Submit
						</Button>
					</Form>
				)}
			</div>
		</>
	);
}

export default TemplateEditor;

function QuestionItem({ id, qNum, question, updateQuestion, type }) {
	const handleQuestion = (e, name) => {
		updateQuestion(id, name, e.target.value);
	};

	return (
		<>
			<Form.Group className="mb-3" controlId={`question` + qNum}>
				<Form.Label className="h4 text-darkblue">Question {qNum}</Form.Label>
				<Form.Control
					type="input"
					value={question}
					onChange={(e) => handleQuestion(e, "title")}
				/>
			</Form.Group>
			<Form.Group controlId="type-dropdown">
				<Form.Label className="text-darkblue ms-1 ">Response Type</Form.Label>
				<Form.Select
					value={type}
					aria-label="Response Type Drop Down"
					onChange={(e) => handleQuestion(e, "type")}
				>
					<option value="rating">Rating</option>
					<option value="short">Short Text</option>
					<option value="long">Text Area</option>
					<option value="hours">Hours</option>
					<option value="binary">Binary</option>
					<option value="choices">Checkboxes</option>
				</Form.Select>
			</Form.Group>
		</>
	);
}
