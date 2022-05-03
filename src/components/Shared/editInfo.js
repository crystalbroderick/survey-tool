import React from "react";
import {TextField, Box} from "@mui/material";

function EditInfo({title, id}) {
  return (
    <Box
      component="form"
      autoComplete="off"
    >
      <TextField id="title" label="Title" variant="filled" defaultValue={title} fullWidth margin="normal" />
      <TextField id="desc" label="Description" variant="standard" fullWidth margin="dense"/>

    </Box>
  );
}

export default EditInfo;
