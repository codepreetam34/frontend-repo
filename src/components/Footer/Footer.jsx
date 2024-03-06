import FMTypography from "../../components/FMTypography/FMTypography";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import androidIcon from "../../assets/androidIcon.svg";
import appleIcon from "../../assets/appleIcon.svg";
import footerLogo from "../../assets/FooterLogo.png";
import { Box, InputAdornment, InputBase, useMediaQuery } from "@mui/material";
import FMButton from "../../components/FMButton/FMButton";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";

// const fs = require("fs");
// const { SitemapStream, streamToPromise } = require("sitemap");
// const { createGzip } = require("zlib");

// Import your routes
import {
  ROOT,
  LOGIN,
  SIGNUP,
  EMAIL_VERIFY,
  EMAIL_VERIFY_OTP,
  FORGOTPASSWORD,
  SETUP_NEW_PASSWORD,
  LANDING_PAGE,
  TEST,
  ADD_TO_CART,
  PRIVACY_POLICY,
  FAQ,
  BLOGS,
  BLOGS_DETAIL,
  ADD_REVIEW,
  MY_PROFILE,
  CATEGORY_PAGE,
  PRODUCT_PAGE,
  PRODUCT_DETAIL,
  ORDER_PAGE,
  SET_UP_NEW_PASSWORD,
  BECOME_A_MEMBER,
  CONTACT_US,
  VENDOR_JOURNEY,
} from "../../Routes/Routes";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    background: "#FCEDEE",
    padding: "20px 40px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 15px 0",
    },
  },
  centeredColumn: {
    display: "flex",
    justifyContent: "center",
  },
  subscribeContainer: {
    fontSize: "14px",
    color: "#717171",
    fontWeight: "400",
    listStyle: "none",
    textAlign: "center",
    paddingBottom: "0.8rem",
  },
  subscribeTitle: {
    fontSize: "20px",
    fontWeight: "600 !important",
    textAlign: "center",
    paddingBottom: "5px",
  },
  subscribeBox: {
    display: "flex",
    paddingTop: "10px",
  },
  subscribeInput: {
    width: "279px",
    height: "55px",
    flexShrink: "0",
    borderRadius: "10px 0px 0px 10px",
    background: "#FFF",
    padding: "5px 20px 5px",
    border: "1px solid #801317",
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      height: "50px",
    },
  },
  subscribeButton: {
    width: "120px",
    height: "55px",
    flexShrink: "0",
    borderRadius: "0px 10px 10px 0px",
    background: "#801317",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      width: "110px",
      height: "50px !important",
    },
  },
  logoContainer: {
    fontSize: "14px",
    color: "#717171",
    fontWeight: "400",
    listStyle: "none",
    marginLeft: "1.1rem",
    paddingBottom: "0.8rem",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "0.2rem",
      marginLeft: "0rem",
    },
  },
  logo: {
    width: "100%",
  },
  addressContainer: {
    fontSize: "14px",
    color: "#717171",
    fontWeight: "400",
    listStyle: "none",
    marginLeft: "1.1rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0rem",
    },
  },
  address: {
    padding: "0rem 0 1rem 0",
  },
  availableOn: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  availableText: {
    fontSize: "14px",
    color: "#717171",
    fontWeight: "400",
  },
  icon: {
    marginRight: "1rem",
    width: "25px",
  },
  linksColumn: {
    paddingTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "10px"
    },

  },
  sectionTitle: {
    fontSize: "14px",
    color: "#717171",
    fontWeight: "400",
    listStyle: "none",
    textAlign: "center",
    paddingBottom: "0.8rem",
    [theme.breakpoints.down("sm")]: {
      textAlign: "start",
    },
  },
  sectionTitleText: {
    fontSize: "20px",
    fontWeight: "500 !important",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "start",
    },
  },
  linksContainer: {
    fontSize: "14px",
    color: "#717171",
    fontWeight: "400",
    listStyle: "none",
    textAlign: "center",
    paddingBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      textAlign: "start",
    },
  },
  link: {
    padding: "5px 0",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      padding: "2px 0",
    },
  },
  copyrightRow: {
    background: "#EAB6B8",
    padding: "15px 50px 15px 50px",
  },
  copyright: {
    fontSize: "12px",
    color: "#801317",
    fontWeight: "700",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      fontWeight: "700",
    },
  },

  anchorLink: {
    color: "#717171",
    textDecoration: "none",
    transition: "color 0.3s",
    "&:hover": {
      color: "#333",
    },
  },
}));
const Footer = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");


  // const generateSitemap = async () => {
  //   const routes = [
  //     ROOT,
  //     LOGIN,
  //     SIGNUP,
  //     EMAIL_VERIFY,
  //     EMAIL_VERIFY_OTP,
  //     FORGOTPASSWORD,
  //     SETUP_NEW_PASSWORD,
  //     LANDING_PAGE,
  //     TEST,
  //     ADD_TO_CART,
  //     PRIVACY_POLICY,
  //     FAQ,
  //     BLOGS,
  //     BLOGS_DETAIL,
  //     ADD_REVIEW,
  //     MY_PROFILE,
  //     CATEGORY_PAGE,
  //     PRODUCT_PAGE,
  //     PRODUCT_DETAIL,
  //     ORDER_PAGE,
  //     SET_UP_NEW_PASSWORD,
  //     BECOME_A_MEMBER,
  //     CONTACT_US,
  //   ];

  //   (async () => {
  //     try {
  //       const smStream = new SitemapStream({ hostname: "http://vibezter.com" });
  //       const pipeline = smStream.pipe(createGzip());

  //       routes.forEach((route) => {
  //         smStream.write({ url: route, changefreq: "daily", priority: 0.7 });
  //       });

  //       smStream.end();

  //       const data = await streamToPromise(pipeline);
  //       fs.writeFileSync("./public/sitemap.xml.gz", data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();




  // };

  return (
    <Container fluid>
      <Row className={classes.footerContainer}>
        <Col md={12} className={classes.centeredColumn}>
          <div className={classes.subscribeContainer}>
            <FMTypography
              displayText={"Subscribe"}
              className={classes.subscribeTitle}
            />
            <Box className={classes.subscribeBox}>
              <InputBase
                required
                id="text"
                name="text"
                placeholder="Enter Email"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
                className={classes.subscribeInput}
              />
              <FMButton
                displayText={"Submit"}
                styleData={{
                  width: "120px",
                  height: isMobile ? "50px" : "55px",
                  flexShrink: "0",
                  border: "1px solid #801317",
                  borderRadius: "0px 10px 10px 0px",
                  background: "#801317",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "600",
                }}
                style={{ textTransform: "capitalize !important" }}
              />
            </Box>
          </div>
          <div></div>
        </Col>
        <Col md={3}>
          <div className={classes.logoContainer}>
            <img src={footerLogo} className={classes.logo} alt="footer-logo" />
          </div>
          <div className={classes.addressContainer}>
            <div className={classes.address}>
              319, Aggarwal Millennium Tower 1, above bittu tikki wala, Netaji
              Subhash Place, Pitam Pura, New Delhi, Delhi 110034
            </div>
            <div className={classes.address}>hr@thewebgross.com</div>
            <div className={classes.availableOn}>
              <div className={classes.availableText}>Available on:</div>
              <div>
                <img
                  src={androidIcon}
                  alt="android-icon"
                  className={classes.icon}
                />
                <img
                  src={appleIcon}
                  alt="apple-icon"
                  className={classes.icon}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col md={9} className={classes.linksColumn}>
          <Row>
            <Col className={classes.linksColumn}>
              <div className={classes.sectionTitle}>
                <FMTypography
                  displayText={"About Us"}
                  styleData={classes.sectionTitleText}
                />
              </div>
              <div className={classes.linksContainer}>
                <div className={classes.link}>Info Page</div>
                <div className={classes.link}><a href={VENDOR_JOURNEY} className={classes.anchorLink}>Vendor Journey</a></div>
                <div className={classes.link}><a href={BECOME_A_MEMBER} className={classes.anchorLink}>Become a Vendor</a></div>
              </div>
            </Col>
            <Col className={classes.linksColumn}>
              <div className={classes.sectionTitle}>
                <FMTypography
                  displayText={"Policy Info"}
                  styleData={classes.sectionTitleText}
                />
              </div>
              <div className={classes.linksContainer}>
                <div className={classes.link}>Careers</div>
                <div className={classes.link}>Site Map</div>
                <div className={classes.link}>Terms & Policy</div>
              </div>
            </Col>
            <Col className={classes.linksColumn}>
              <div className={classes.sectionTitle}>
                <FMTypography
                  displayText={"Help"}
                  styleData={classes.sectionTitleText}
                />
              </div>
              <div className={classes.linksContainer}>
                <div className={classes.link}><a href={CONTACT_US} className={classes.anchorLink}>Contact Us</a></div>
                <div className={classes.link}>
                  <Link to={PRIVACY_POLICY} className={classes.anchorLink}>Privacy Policy</Link>
                </div>
                <div className={classes.link}>Terms & Conditions</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={classes.copyrightRow}>
        <Col className={classes.centeredColumn}>
          <div className={classes.copyright}>
            All Copyright reserved by © Webgross Pvt Ltd.
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;


