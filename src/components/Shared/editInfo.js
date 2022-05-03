import React from "react";
import {TextField, Box, Container, Typography} from "@mui/material";

function EditInfo({title, id}) {

  return (
    <Container>
      <Typography variant="h6"
      color="textSecondary"
      component="h2"
      gutterBottom>{`Optional: Update title and description for new ${title}`}</Typography>
    <Box
      component="form"
      autoComplete="off"
    >
      <TextField id="title" label="Title" variant="filled" defaultValue={title} fullWidth margin="normal" />
      <TextField id="desc" label="Description" variant="filled" fullWidth margin="normal"/>

    </Box>
    </Container>
  );
}

export default EditInfo;
