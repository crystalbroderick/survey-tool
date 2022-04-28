import React from "react";
import {
  Button,
  CardActions,
  Typography,
  CardContent,
  Box,
} from "@mui/material";
import { Modal } from "@mui/material";
import Questions from "./Questions";
import { Link as RouterLink } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function TemplateCard({ id, title, type }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/templates/${id}`}
            state={{ title: title, type: type }}
          >
            Use Template
          </Button>
          <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
            Preview
          </Button>
        </CardActions>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-questions"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title} Preview
          </Typography>
          <Typography
            component={"span"}
            id="modal-modal-questions"
            sx={{ mt: 2 }}
          >
            <Questions template={id} />
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/templates/${id}`}
            state={{ title: title, type: type }}
          >
            Use Template
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default TemplateCard;
