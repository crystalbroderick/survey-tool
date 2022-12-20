import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TemplateData from "../../api/templates.data";
import SurveyData from "../../api/surveys.data";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth, AuthContext } from "../context/AuthContext";
import { addDoc, Timestamp, collection } from "firebase/firestore";
import db from "../../firebase.config.js";
import "firebase/firestore";
import Types from "../questions/Types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
	const [newId, setNewId] = useState(1);

	const handleAdd = () => {
		const newQuestion = questions.concat({ id: newId, title: "" });
		setNewId((prev) => prev + 1);
		setQuestions(newQuestion);
	};

	function handleInfoChange(e) {
		const { name, value } = e.target;
		setTemplate((curr) => {
			return { ...curr, [name]: value };
		});
	}
	// update question title / type state
	const updateQuestion = (id, name, value) => {
		const item = questions.find((x) => x.id === id);
		const updatedItem = { ...item, [name]: value };
		const newQuestion = [...questions];
		newQuestion.splice(questions.indexOf(item), 1, updatedItem);
		setQuestions(newQuestion);
	};
	// update question response options.
	const updateQuestionOptions = (id, name, value) => {
		const item = questions.find((x) => x.id === id);
		const updatedItem = {
			...item,
			options: { ...item.options, [name]: value },
		};
		const newQuestion = [...questions];
		newQuestion.splice(questions.indexOf(item), 1, updatedItem);
		setQuestions(newQuestion);
	};

	// Remove question
	const handleDelete = (id) => {
		const newQuestions = questions.filter((item) => item.id !== id);
		setQuestions(newQuestions);
	};

	// Validates fields before calling addSurvey
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

		// TODO : checks questions for undefined values
		//
		const isEmpty = Object.keys(allErrors).length === 0;
		if (!isEmpty) {
			setErrors(allErrors);
			setValidated(false);
		} else {
			setValidated(true);
			addSurvey();
		}
	};
	// Add new user survey to database
	async function addSurvey() {
		const surveysRef = collection(db, "surveys");
		const newSurvey = {
			title: template.title,
			desc: template.desc,
			uid: currentUser.uid,
			created: Timestamp.now(),
		};
		// create new survey
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
						options: doc.options || "",
					});
					navigate("/surveys");
				})
				.catch((e) => console.log("Error adding questions..", e));
		}
	}
	// Get template info and questions list on page load //
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
						{/* View all template questions - edit per question item */}
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
										options={question.options}
										updateQuestionOptions={updateQuestionOptions}
										handleDelete={handleDelete}
									></QuestionItem>
								</div>
							))}
						</Stack>
						<Row>
							<Col>
								<Button className="mt-3" onClick={handleAdd}>
									Add Question
								</Button>
							</Col>
							<Col className="d-flex justify-content-end mt-3">
								<Button
									variant="nscgreen"
									type="submit"
									className="m-3 "
									onSubmit={(e) => handleSubmit(e)}
								>
									Submit
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</div>
		</>
	);
}

export default TemplateEditor;

function QuestionItem({
	id,
	qNum,
	question,
	updateQuestion,
	type,
	options,
	updateQuestionOptions,
	handleDelete,
}) {
	function handleQuestion(e) {
		updateQuestion(id, e.target.name, e.target.value);
	}

	return (
		<>
			<Form.Group className="mb-3" controlId={`question` + qNum}>
				<Row>
					<Col sm={8}>
						<Form.Label className="h4 text-darkblue">
							Question {qNum}
						</Form.Label>
					</Col>
					<Col sm={4} className="d-flex justify-content-end mb-3">
						{" "}
						<Button onClick={(e) => handleDelete(id)}>Delete</Button>
					</Col>
				</Row>
				<Form.Control
					type="input"
					value={question}
					name="title"
					onChange={(e) => handleQuestion(e)}
				/>
			</Form.Group>
			<Form.Group controlId="type-dropdown">
				<Form.Label className="text-darkblue ms-1 ">Response Type</Form.Label>
				<Form.Select
					value={type ? type : "Select response type"}
					aria-label="Response Type Drop Down"
					name="type"
					onChange={(e) => handleQuestion(e)}
				>
					<option>Response Type</option>
					<option value="rating">Rating</option>
					<option value="short">Short Text</option>
					<option value="long">Long Text Area</option>
					{/* <option value="hours">Hours</option>
					<option value="binary">Binary</option>
					<option value="choices">Checkboxes</option> */}
				</Form.Select>
				{type ? (
					<Types
						type={type}
						preview="preview"
						handleQuestion={handleQuestion}
						options={options}
						updateQuestionOptions={updateQuestionOptions}
						id={id}
					/>
				) : null}
			</Form.Group>
		</>
	);
}
