import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import Container from "@mui/material/Container";
import DesignStepper from '../Design/Stepper'
import { Typography, Box } from '@mui/material';

function TemplateDesign() {
  const l = useLocation();
  console.log(l.state)
  const [title, setTitle] = useState(l.state.title)
  const [type, setType] = useState(l.state.type)
  
  return (
    <Container>
      <Box sx={{bgcolor: "background.paper"}}>
      <Typography variant="h2" m={2} component="h2" py={1} >{title}</Typography>
      <DesignStepper title={title}></DesignStepper>
      </Box>
    </Container>
  )
}

export default TemplateDesign