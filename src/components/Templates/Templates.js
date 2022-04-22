import React from "react";
import Container from "@mui/material/Container";
function Templates() {
	const template = [
		{
			id: 1,
			title: "Presenter Template",
		},
		{ id: 12, title: "Attendee Template" },
	];

	return (
		<Container maxWidth="md">
			<h1>Templates</h1>
		</Container>
	);
}

export default Templates;
