import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import EditInfo from './editInfo'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`editSurvey-${index}`}
      aria-labelledby={`editSurvey-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `editSurvey-${index}`,
    "aria-controls": `editSurvey-${index}`,
  };
}

export default function TabNav({title}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let { id } = useParams();

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="edit survey">
          <Tab label="Edit Info" {...a11yProps(0)} />
          <Tab label="Design" {...a11yProps(1)} />
          <Tab label="Preview" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EditInfo id={id} title={title}></EditInfo>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Design view
      </TabPanel>
      <TabPanel value={value} index={2}>
        Preview Updated Survey
      </TabPanel>
    </Box>
  );
}
