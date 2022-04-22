import React from "react";
import Container from "@mui/material/Container";
import TemplateCard from "./TemplateCard";
import { Grid, Box, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

function Templates() {
  const templates = [
    {
      id: 1,
      title: "Presenter Survey",
    },
    { id: 12, title: "Attendee Survey" },
  ];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Container maxWidth="md">
      <h1>Templates</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {templates.map((template, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item><TemplateCard key={template.id} template={template} /></Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Templates;
