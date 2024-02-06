import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Profile from "../Profile";
import Header from "../../../components/SearchBar/Header";
import { Col, Container, Row } from "react-bootstrap";
import { AllViewsFileStyle } from "./AllViewsFileStyle";
import AllAddresses from "../AllAddresses";
import Footer from "components/Footer/Footer";
import { useMediaQuery } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   tabsContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     [theme.breakpoints.down("sm")]: {
//       marginTop: "0rem",
//       display: 'flex',
//       justifyContent: "center",
//       gap: "1rem",
//     },
//   },
//   tab: {
//     border: "1px solid #801317",
//     borderRadius: "100px",
//     boxShadow:
//       "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
//     marginBottom: ({ isMobile }) => (isMobile ? 0 : "1rem"),
//     background: "#fff",
//   },
// }));

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

export default function VerticalTabs() {
  const [value, setValue] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '1rem',
    },
    '@media (max-width: 600px)': {
      container: {
        justifyContent: 'center',
        flexDirection: 'row',
      },
    },
  };
  return (
    <>
      <Header />

      <Container style={{ marginTop: isMobile ? "20px" : "20px" }}>
        <Row>
          <Col className="col-md-2">
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={AllViewsFileStyle.tabSideLine}>
              <div style={{
                ...styles.container,
                ...(window.innerWidth <= 600 && styles['@media (max-width: 600px)'].container),
              }}>
                <Tab
                  label="Profile"
                  {...a11yProps(0)}
                  sx={{
                    border: "1px solid #801317",
                    borderRadius: "100px",
                    boxShadow:
                      "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                    marginBottom: isMobile ? 0 : "1rem",
                    background: "#fff",
                  }}
                />
                <Tab
                  label="Addresses"
                  {...a11yProps(1)}
                  sx={{
                    border: "1px solid #801317",
                    borderRadius: "100px",
                    boxShadow:
                      "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                    marginBottom: isMobile ? 0 : "1rem",
                    background: "#fff",
                  }}
                />
              </div>
            </Tabs>
          </Col>
          <Col className="col-md-10">
            <TabPanel value={value} index={0}
              sx={{ "MuiTabs-indicator": { display: "none !important" } }}
            >
              <Profile />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AllAddresses />
            </TabPanel>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
