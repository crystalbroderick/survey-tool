import React from "react";
import {
  Button,
  CardActions,
  Typography,
  CardContent,
  Box,
} from "@mui/material";

function TemplateCard({ template }) {

  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {template.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined">
            Preview
          </Button>
        </CardActions>
      </Box>
    </div>
  );
}

export default TemplateCard;
