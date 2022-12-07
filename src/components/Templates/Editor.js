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
import { useAuth } from "../context/AuthContext";
import { Timestamp } from "firebase/firestore";

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

	// const [newSurvey, setNewSurvey] = useState({
	// 	// auto generate id
	// 	id: 'question1id',

	// });
	// function handleInfoChange(e) {
	// 	const { name, value } = e.target;
	// 	setNewSurvey((curr) => ({ ...curr, [name]: value }));
	// }
	function handleInfoChange(e) {
		const { name, value } = e.target;
		setTemplate((curr) => {
			return { ...curr, [name]: value };
		});
	}

	const updateQuestion = (id, name, value) => {
		console.log("update: ", id, value);
		const item = questions.find((x) => x.id === id);
		const updatedItem = { ...item, [name]: value }; // update question / type
		const newQuestion = [...questions];
		newQuestion.splice(questions.indexOf(item), 1, updatedItem);
		setQuestions(newQuestion);
		console.log(questions);
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
	const addSurvey = async () => {
		try {
			const newSurvey = {
				title: template.title,
				desc: template.desc,
				user: currentUser.uid,
				created: Timestamp.now(),
			};
			const docRef = await SurveyData.addSurvey(newSurvey);
			console.log("Document written with ID: ", docRef.id);
			navigate("/surveys");
		} catch (e) {
			console.log("Error creating new survey ", e);
		}
	};

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
										//type={question.type}
										updateQuestion={updateQuestion}
										//updateResType={handleTypeChange}
									></QuestionItem>
								</div>
							))}
						</Stack>
						<Button
							variant="primary"
							type="submit"
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

function QuestionItem({ id, qNum, question, updateQuestion }) {
	const [questionTitle, setQuestionTitle] = useState("");

	const handleQuestion = (name, value) => {
		if (name === "title") {
			setQuestionTitle(value);
		}
		updateQuestion(id, name, questionTitle);
	};

	return (
		<Form.Group className="mb-3" controlId={`question` + qNum}>
			<Form.Label className="h4 text-darkblue">Question {qNum}</Form.Label>
			<Form.Control
				type="input"
				value={questionTitle ? questionTitle : question}
				onChange={(e) => handleQuestion("title", e.target.value)}
			/>
		</Form.Group>
	);
}

// {/* <Form.Label className="text-darkblue ms-1 ">
// 	Response Type
// </Form.Label>
// <Form.Select
// 	value={question.type}
// 	aria-label="Response Type Drop Down"
// 	onChange={(e) => handleTypeChange(question.id, e)}
// >
// 	{" "}
// 	<option
// 		value="rating"
// 		name="type"
// 		onChange={(e) => handleTypeChange(question.id, e)}
// 	>
// 		Rating
// 	</option>
// 	<option
// 		value="short"
// 		name="type"
// 		onChange={(e) => handleTypeChange(question.id, e)}
// 	>
// 		Short Text
// 	</option> */}
// 	{/* <option
// 		value="long"
// 		name="type"
// 		onChange={(e) => handleTypeChange(question.id, e)}
// 	>
// 		Text Area
// 	</option>
// 	<option
// 		value="hours"
// 		name="type"
// 		onChange={(e) => handleTypeChange(question.id, e)}
// 	>
// 		Hours
// 	</option>
// 	<option
// 		value="binary"
// 		name="type"
// 		onChange={(e) => handleTypeChange(question.id, e)}
// 	>
// 		Binary
// 	</option>
// 	<option
// 		value="choices"
// 		name="type"
// 		onChange={(e) => handleTypeChange(question.id, e)}
// 	>
// 		Checkboxes
// 	</option> */}
