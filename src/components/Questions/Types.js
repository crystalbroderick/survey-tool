import React from "react";
import RadioGroupRating from "./RadioGroupRating";
import { TextField } from "@mui/material";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
export default function questionType({
	type,
	preview,
	handleQuestion,
	options,
	updateQuestionOptions,
	id,
}) {
	switch (type) {
		case "rating":
			return (
				<RadioGroupRating
					preview={preview}
					handleQuestion={handleQuestion}
					options={options}
					updateQuestionOptions={updateQuestionOptions}
					id={id}
				/>
			);
		case "short":
			return (
				<>
					<div className="h6 text-primary mt-3">Preview:</div>
					<TextField
						fullWidth
						id="fullWidth"
						placeholder="Enter short response here"
						variant="standard"
					/>
				</>
			);
		case "long":
			return (
				<>
					<div className="h6 text-primary mt-3 mb-3">Preview:</div>
					<FloatingLabel controlId="textarea" label="Comments">
						<Form.Control
							as="textarea"
							placeholder="Leave a comment here"
							style={{ height: "100px" }}
							readOnly={preview ? preview : false}
						/>
					</FloatingLabel>
				</>
			);
		default:
			return "No Question Type found.";
	}
}
