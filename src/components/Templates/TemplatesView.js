import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col, Button } from "react-bootstrap/";
import Row from "react-bootstrap/Row";
import TemplateData from "../../api/templates.data";
import { useNavigate, Link } from "react-router-dom";
export default function TemplatesView() {
	const [templates, setTemplates] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const getTemplates = async () => {
			const data = await TemplateData.getAllTemplates();
			setTemplates(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getTemplates();
	}, []);
	return (
		<>
			<h1 className="page-title">Templates</h1>

			<Row xs={2} md={3} className="g-3">
				{templates.map((template) => (
					<Col key={template.id}>
						<Card
							//border="primary"
							bg="neutral"
							className="shadow p-3 mb-5 rounded h-75"
							key={template.id}
						>
							<Card.Body>
								<Card.Title>{template.title}</Card.Title>
								<Card.Text>{template.desc ? template.desc : null}</Card.Text>
							</Card.Body>{" "}
							<div className="d-flex justify-content-end align-items-end">
								<Link
									className="btn btn-nscgreen "
									to={`/template/${template.id}`}
									state={{
										title: template.title,
										id: template.id,
										desc: template.desc,
									}}
								>
									Use Template
								</Link>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
}
