import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import Container from "@mui/material/Container";
import TabNav from '../Shared/tabNav';

function TemplateDesign() {
  const l = useLocation();
  console.log(l.state)
  const [title, setTitle] = useState(l.state.title)
  const [type, setType] = useState(l.state.type)
  
  return (
    <Container>
      <h1>{title}</h1>
      <TabNav title={title}></TabNav>
    </Container>
  )
}

export default TemplateDesign