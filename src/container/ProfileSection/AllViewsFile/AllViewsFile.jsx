import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Profile from "../Profile";
import Header from "../../../components/SearchBar/Header";
import { Col, Container, Row } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { AllViewsFileStyle } from "./AllViewsFileStyle";
import Reminder from "../Reminder";
import AllAddresses from "../AllAddresses";
import Footer from "components/Footer/Footer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  indicator: {
    backgroundColor: "transparent",
  },
  //   MuiButtonBase-root-MuiTab-root.Mui-selected: {

  //   }
});

export default function VerticalTabs() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />

      <Container style={{marginTop:'40px'}}>
        <Row>
          <Col className="col-md-2">
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={AllViewsFileStyle.tabSideLine}
            >
              <Tab
                label="Profile"
                {...a11yProps(0)}
                sx={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "100px",
                  boxShadow:
                    "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                  marginBottom: "1rem",
                }}
              />
              {/* <Tab
                label="Orders"
                {...a11yProps(1)}
                sx={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "100px",
                  boxShadow:
                    "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                  marginBottom: "1rem",
                }}
              /> */}
              <Tab
                label="Addresses"
                {...a11yProps(1)}
                sx={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "100px",
                  boxShadow:
                    "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                  marginBottom: "1rem",
                }}
              />
              {/* <Tab
                label="Reminders"
                {...a11yProps(2)}
                sx={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "100px",
                  boxShadow:
                    "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                  marginBottom: "1rem",
                }}
              /> */}
            </Tabs>
          </Col>
          <Col className="col-md-10">
            <TabPanel
              value={value}
              index={0}
              sx={{ "MuiTabs-indicator": { display: "none" } }}
            >
              <Profile />
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
              Item Two
            </TabPanel> */}
            <TabPanel value={value} index={1}>
              <AllAddresses />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Reminder />
            </TabPanel>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
