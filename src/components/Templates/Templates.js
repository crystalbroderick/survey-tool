import React, {useState, useEffect} from "react";
import Container from "@mui/material/Container";
import TemplateCard from "./TemplateCard";
import { Grid, Card } from "@mui/material";
import TemplateData from "../../api/templates.data";

function Templates() {

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const getTemplates = async () => {
      const data = await TemplateData.getAllTemplates();
      setTemplates(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTemplates();
  }, []);

  return (
    <Container>
      <h1>Templates</h1>
      
        <Grid
          container
          spacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {templates.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.id} >
              <Card raised>
              <TemplateCard
              title={item.title}
              type={item.type}
              id={item.id}
            />
              </Card>
            </Grid>
          ))}
        </Grid>
      
    </Container>
  );
}

export default Templates;
