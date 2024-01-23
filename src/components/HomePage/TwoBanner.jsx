import FMButton from "../../components/FMButton/FMButton";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageTwoAdsBanner } from "Redux/Slices/TwoAdsBanner/TwoAdsBannerSlice";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  twobannersection: {
    padding: "50px 80px 0",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
    },
  },
  twobannersectionImg: {
    width: "100%",
    borderRadius: "20px",
  },
  twobandata: {
    position: "absolute",
    top: "50%",
    left: "20px",
    transform: "translateY(-50%)",
  },
  twoBannerBackgroundOverlay: {
    position: "absolute",
    content: '""',
    left: 0,
    top: 0,
    borderRadius: "20px",
    background:
      "linear-gradient(270deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.4) 56%)",
    width: "100%",
    height: "100%",
    flexShrink: 0,
  },
  titleStyle: {
    fontSize: "24px",
    color: "#FFC72C",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  paragraphStyle: {
    fontSize: "14px",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
    },
  },
  columnGap: {
    [theme.breakpoints.down("xs")]: {
      gap: "1rem",
    },
  },
}));

const TwoBanner = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomePageTwoAdsBanner());
  }, [dispatch]);

  const twoBannerData = useSelector(
    (state) => state?.twoAdsBanner?.twoAdsBanners?.homepageBanner
  );

  return (
    <div className={classes.twobannersection}>
      <Container fluid className="m-0 p-0">
        <Row className={classes.columnGap}>
          <Col md={6}>
            <div className="position-relative">
              <div className={classes.twoBannerBackgroundOverlay}></div>
              <img
                src={twoBannerData && twoBannerData[0]?.banner}
                className={classes.twobannersectionImg}
                alt=""
              />
              <div className={classes.twobandata}>
                <h4 className={classes.titleStyle}>The Anniversary</h4>
                <p className={classes.paragraphStyle}>
                  Send lots of blooms this anniversary
                </p>
                <FMButton
                  displayText={"Gift Now"}
                  onHover={"white"}
                  styleData={{
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="position-relative">
              <div class="two-banner-background-overlay"></div>
              <img
                src={twoBannerData && twoBannerData[1]?.banner}
                className={classes.twobannersectionImg}
                alt=""
              />
              <div className={classes.twobandata}>
                <h4 className={classes.titleStyle}>Bespoke Hampers</h4>
                <p className={classes.paragraphStyle}>
                  To elevate your gifting experience
                </p>
                <FMButton
                  displayText={"Gift Now"}
                  onHover={"white"}
                  styleData={{
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TwoBanner;
