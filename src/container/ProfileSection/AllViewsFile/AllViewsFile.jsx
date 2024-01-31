import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Profile from "../Profile";
import Header from "../../../components/SearchBar/Header";
import { Col, Container, Row } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { AllViewsFileStyle } from "./AllViewsFileStyle";
import Reminder from "../Reminder";
import AllAddresses from "../AllAddresses";
import Footer from "components/Footer/Footer";
import { useMediaQuery } from "@mui/material";

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

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "transparent",
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down("sm")]: {
      marginTop: "0rem",
      display: 'flex',
      justifyContent: "center",
      gap: "1rem",
    },

  }
  //   MuiButtonBase-root-MuiTab-root.Mui-selected: {

  //   }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [value, setValue] = React.useState(0);

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

      <Container style={{ marginTop: isMobile ? '25px' : '40px' }}>
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
                {/* <Tab
                label="Orders"
                {...a11yProps(1)}
                sx={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "100px",
                  boxShadow:
                    "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                  marginBottom: "1rem",

                  E6E6E6
                }}
              /> */}
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
              </div>
            </Tabs>
          </Col>
          <Col className="col-md-10">
            <TabPanel
              value={value}
              index={0}
              sx={{ "MuiTabs-indicator": { display: "none !important" } }}
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
      </Container >
      <Footer />
    </>
  );
}
