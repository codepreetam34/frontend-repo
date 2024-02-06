import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

import helpIcon from "../../assets/ThreePointIcon/helpIcon.png";
import userLockIcon from "../../assets/ThreePointIcon/userLockIcon.png";
import worldIcon from "../../assets/ThreePointIcon/worldIcon.png";

const useStyles = makeStyles((theme) => ({
  threepoint: {
    padding: "50px 80px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 15px",
    },
  },
  icon: {
    marginBottom: "16px",
  },
  heading: {
    fontSize: "16px",
    fontWeight: 600,
    margin: 0,
    paddingBottom: "4px",
  },
  text: {
    margin: 0,
    fontWeight: 300,
    fontSize: "14px",
  },
  columnGap: {
    [theme.breakpoints.down("xs")]: {
      gap: "1rem",
    },
  },
}));

const ThreePoint = () => {
  const classes = useStyles();

  return (
    <div className={classes.threepoint}>
      <Container fluid className="m-0 p-0">
        <Row className={classes.columnGap}>
          <Col md={4} className="text-center">
            <div className="">
              <img
                src={worldIcon}
                className={`${classes.icon} img-fluid`}
                alt=""
              />
              <h3 className={classes.heading}>Worldwide Delivery</h3>
              <p className={classes.text}>
                We deliver gifts to over 70 countries
              </p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <img
              src={userLockIcon}
              className={`${classes.icon} img-fluid`}
              alt=""
            />
            <h3 className={classes.heading}>100% Safe & Secure Payments</h3>
            <p className={classes.text}>Pay using secure payment methods</p>
          </Col>
          <Col md={4} className="text-center">
            <div className="">
              <img
                src={helpIcon}
                className={`${classes.icon} img-fluid`}
                alt=""
              />
              <h3 className={classes.heading}>Dedicated Help Center</h3>
              <p className={classes.text}>
                Call us +91 9212422000 | 8:00AM-10:30PM
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ThreePoint;
