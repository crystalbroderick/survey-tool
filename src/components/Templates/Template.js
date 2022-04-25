import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import Container from "@mui/material/Container";

function TemplateDesign() {
  const l = useLocation();
  console.log(l.state)
  const [title, setTitle] = useState(l.state.title)
  const [type, setType] = useState(l.state.type)
  
  return (
    <Container>
      <h1>{title} Template</h1>
    </Container>
  )
}

export default TemplateDesign