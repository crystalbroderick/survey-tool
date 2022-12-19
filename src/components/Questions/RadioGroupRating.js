import * as React from "react";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup } from "react-bootstrap";

export default function RadioGroupRating({
	preview,
	handleQuestion,
	options = { min_value: "min", max_value: "max" },
	updateQuestionOptions,
	id,
}) {
	const arr = [1, 2, 3, 4, 5];
	const [checked, setChecked] = useState(false);
	const [radioValue, setRadioValue] = useState(3);
	const [minValue, setMinValue] = useState(options.min_value);
	const [maxValue, setMaxValue] = useState(options.max_value);

	const updateRatingValue = (e) => {
		if (e.target.name === "min_value") setMinValue(e.target.value);
		if (e.target.name === "max_value") setMaxValue(e.target.value);
		updateQuestionOptions(id, e.target.name, e.target.value);
	};
	return (
		<>
			<Form.Group className="container">
				{preview ? (
					<>
						<div className="row justify-content-start w-50 p-1">
							<InputGroup className=" mt-3 col me-2">
								Min Value
								<Form.Control
									type="input"
									name="min_value"
									value={minValue}
									onChange={(e) => updateRatingValue(e)}
								/>
							</InputGroup>
							<InputGroup className="mt-3 col">
								Max Value
								<Form.Control
									type="input"
									name="max_value"
									value={maxValue}
									onChange={(e) => updateRatingValue(e)}
								/>
							</InputGroup>
						</div>

						<div className="h6 text-primary mt-3">Preview:</div>
					</>
				) : null}
				<div className="row w-50 mt-4">
					<div className="col">{minValue}</div>

					<ButtonGroup className="col-6">
						{arr.map((rating, idx) => (
							<ToggleButton
								key={idx}
								id={`radio-${idx}`}
								type={rating}
								name={rating}
								value={radioValue}
								variant="primary"
								checked={radioValue === rating}
								//onClick={(e) => setRadioValue(e.target.value)}
							>
								{rating}
							</ToggleButton>
						))}
					</ButtonGroup>

					<div className="col ">{maxValue}</div>
				</div>
			</Form.Group>
		</>
	);
}
// {options.map((data, i) => (
// 	<button
// 		key={data.PollOptionId}
// 		type="button"
// 		className={
// 			`pollanswer-optionitem active ` +
// 			(ratingValue === data.PollOptionId ? "selected" : "")
// 		}
// 		onClick={() =>
// 			!prevValue ? handleAnswer(data.PollOptionId) : () => false
// 		}
// 	>
// 		{i + 1}
// 	</button>
// ))}
// </div>
