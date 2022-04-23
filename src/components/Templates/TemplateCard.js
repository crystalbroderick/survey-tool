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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
          <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
            Preview
          </Button>
        </CardActions>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title} Preview
          </Typography>
          <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
            <Questions template={id}/>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TemplateCard;
