import React from "react";
import { useEffect, useState } from "react";
import templatesData from "../../api/templates.data";
import { List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Types from "../Questions/Types";

export default function Questions({ template }) {
  const [questions, setQuestions] = useState([]);

  const listQuestion = (
    <ol>
      {questions.map((question, index) => (
        <li key={index}>
          <List>
            <ListItem>{question.title}</ListItem>
            <ListItem>
              <Types type={question.type}></Types>
            </ListItem>
          </List>
        </li>
      ))}
    </ol>
  );

  useEffect(() => {
    const getQuestions = async () => {
      const querySnapshot = await templatesData.getTemplateQuestions(template);
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        setQuestions(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Typography component={"span"} variant={"body2"}>
      {listQuestion}
    </Typography>
  );
}
